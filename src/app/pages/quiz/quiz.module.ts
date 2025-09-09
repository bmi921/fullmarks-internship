import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';

@NgModule({
  declarations: [QuizComponent],
  imports: [CommonModule, QuizRoutingModule, FormsModule],
})
export class QuizModule {}
