import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  correctAnswers: Character[] = [];
  wrongAnswers: Character[] = [];
  accuracy: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.correctAnswers = this.dataService.getAnswerLog('correct');
    this.wrongAnswers = this.dataService.getAnswerLog('wrong');
    this.calculateAccuracy();
  }

  calculateAccuracy(): void {
    const total = this.correctAnswers.length + this.wrongAnswers.length;
    if (total > 0) {
      this.accuracy = (this.correctAnswers.length / total) * 100;
    }
  }
}
