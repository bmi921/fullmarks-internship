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
  shareUrl: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.correctAnswers = this.dataService.getAnswerLog('correct');
    this.wrongAnswers = this.dataService.getAnswerLog('wrong');
    this.calculateAccuracy();
    this.createShareUrl();
  }

  calculateAccuracy(): void {
    const total = this.correctAnswers.length + this.wrongAnswers.length;
    if (total > 0) {
      this.accuracy = (this.correctAnswers.length / total) * 100;
    }
  }

  createShareUrl(): void {
    const totalQuestions = this.correctAnswers.length + this.wrongAnswers.length;
    const text = `ゆるキャラクイズで遊んだよ！${totalQuestions}問答えて正答率は${this.accuracy.toFixed(
      0
    )}%でした！`;
    const encodedText = encodeURIComponent(text);
    // TODO: Replace with actual app URL
    const url = 'http://localhost:4200';
    this.shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
  }

  clearHistory(): void {
    localStorage.removeItem('correct');
    localStorage.removeItem('wrong');
    this.correctAnswers = [];
    this.wrongAnswers = [];
    this.accuracy = 0;
  }
}
