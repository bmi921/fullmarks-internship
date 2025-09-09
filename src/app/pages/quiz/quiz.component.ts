import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmService } from 'src/app/shared/modal/confirm.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  currentCharacter?: Character;
  choices: string[] = [];
  questionType: 'name' | 'prefecture' = 'name';
  questionText: string = '';

  constructor(
    private dataService: DataService,
    private confirmService: ConfirmService,
  ) {}

  ngOnInit(): void {
    this.dataService.getCharacters().subscribe((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      this.currentCharacter = data[randomIndex];

      // 問題の種類をランダムに決定
      this.questionType = Math.random() > 0.5 ? 'name' : 'prefecture';

      if (this.currentCharacter) {
        // 正解の答え
        const correctAnswer =
          this.questionType === 'name'
            ? this.currentCharacter.name
            : this.currentCharacter.prefecture;

        // ダミー選択肢を3つ取得
        let wrongChoices: string[] = [];
        while (wrongChoices.length < 3) {
          const rand = data[Math.floor(Math.random() * data.length)];
          const candidate =
            this.questionType === 'name' ? rand.name : rand.prefecture;

          if (
            candidate !== correctAnswer &&
            !wrongChoices.includes(candidate)
          ) {
            wrongChoices.push(candidate);
          }
        }

        // 正解を追加してシャッフル
        this.choices = this.shuffleArray([correctAnswer, ...wrongChoices]);

        // 質問文を設定
        this.questionText =
          this.questionType === 'name'
            ? 'このゆるキャラの名前は何？'
            : `${this.currentCharacter.name}の出身県はどこ？`;
      }
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  register(selected: string): void {
    if (!this.currentCharacter) return;

    const correctAnswer =
      this.questionType === 'name'
        ? this.currentCharacter.name
        : this.currentCharacter.prefecture;

    const isCorrect = selected === correctAnswer;

    // モーダルで正解/不正解を表示
    this.confirmService.show(isCorrect, correctAnswer);
  }
}
