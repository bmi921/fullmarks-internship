// quiz-card.component.ts
import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @Input() character!: Character;
}
