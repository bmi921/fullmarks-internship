import { QuizCardComponent } from 'src/app/component/quiz-card/quiz-card.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';

@NgModule({
  declarations: [QuizComponent, QuizCardComponent],
  imports: [CommonModule, QuizRoutingModule, FormsModule],
})
export class QuizModule {}
