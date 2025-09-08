import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  currentCharacter?: Character;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCharacters().subscribe((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      this.currentCharacter = data[randomIndex];
    });
  }
}
