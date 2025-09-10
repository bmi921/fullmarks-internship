import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { DataService } from 'src/app/shared/data.service';
import { GeminiService } from 'src/app/shared/gemini.service';
import { ConfirmService } from 'src/app/shared/modal/confirm.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  currentCharacter?: Character;
  choices: string[] = [];
  questionType: 'name' | 'prefecture' | undefined; // No default, will be set by dataService
  questionText: string = '';
  loading = false;
  hint: string | null = null;
  isHintLoading = false;
  isHintVisible = false;
  isHintFeatureEnabled: boolean = false; // New property

  // New properties for quiz scope
  noQuizScope: boolean = false;
  localStorageKey = 'selectedPrefectures';

  constructor(
    private dataService: DataService,
    private confirmService: ConfirmService,
    private geminiService: GeminiService,
  ) {}

  ngOnInit(): void {
    this.checkQuizScope(); // Check quiz scope first
    if (!this.noQuizScope) {
      // Only load question if there's a scope
      this.loadQuestion();
    }
    this.isHintFeatureEnabled = this.dataService.getHintSetting(); // Initialize hint setting
  }

  private checkQuizScope(): void {
    const storedPrefectures = localStorage.getItem(this.localStorageKey);
    if (storedPrefectures) {
      const parsedPrefectures: string[] = JSON.parse(storedPrefectures);
      this.noQuizScope = parsedPrefectures.length === 0;
    } else {
      // If nothing is stored, it means no prefectures are selected (or default behavior is to select all).
      // Based on setting.component.ts, if nothing is stored, it defaults to selecting all.
      // So, if it's null here, it means the setting component hasn't run yet or it was cleared.
      // For safety, we'll assume no scope if localStorage is empty/null.
      this.noQuizScope = true;
    }
  }

  loadQuestion(): void {
    this.loading = true;
    this.currentCharacter = undefined;
    this.hint = null;
    this.isHintVisible = false;

    this.dataService.getCharacters().subscribe((data) => {
      const storedPrefectures = localStorage.getItem(this.localStorageKey);
      let filteredCharacters = data;

      if (storedPrefectures) {
        const parsedPrefectures: string[] = JSON.parse(storedPrefectures);
        if (parsedPrefectures.length > 0) {
          filteredCharacters = data.filter((character) =>
            parsedPrefectures.includes(character.prefecture),
          );
        }
      }

      if (filteredCharacters.length === 0) {
        this.loading = false;
        this.noQuizScope = true;
        return;
      }

      const quizQuestion =
        this.dataService.generateQuizQuestion(filteredCharacters);
      this.currentCharacter = quizQuestion.character;
      this.questionType = quizQuestion.type;
      this.questionText = quizQuestion.question;

      // Generate choices based on the question type
      if (this.currentCharacter) {
        const correctAnswer =
          this.questionType === 'name'
            ? this.currentCharacter.name
            : this.currentCharacter.prefecture;

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
        this.choices = this.shuffleArray([correctAnswer, ...wrongChoices]);
      }
      this.loading = false;
    });
  }

  getHint(): void {
    if (!this.currentCharacter) return;

    this.isHintLoading = true;
    this.isHintVisible = true;

    const prompt =
      this.questionType === 'name'
        ? `「${this.currentCharacter.name}」 ${this.currentCharacter.description}。このゆるキャラの名前は何？というクイズのヒントを簡潔に教えて。自己紹介文、所属団体はクイズの回答者に見せられていないので、紹介文を見てというヒントは出さないでください。ヒント：というプレフィックスは使わないで。markdown記法は使わないで。箇条書きはやめて。`
        : `「${this.currentCharacter.name}」${this.currentCharacter.description}。このゆるキャラの出身県はどこ？というクイズのヒントを簡潔に教えて。自己紹介文、所属団体はクイズの回答者に見せられていないので、紹介文を見てというヒントは出さないでください。絶対に出身県をヒントにしないで。ヒント：というプレフィックスは使わないで。markdown記法は使わないで。箇条書きはやめて。`;

    this.geminiService.getCompletion(prompt).subscribe({
      next: (hint) => {
        this.hint = hint;
        this.isHintLoading = false;
      },
      error: (error) => {
        console.error('Error getting hint:', error);
        this.hint = 'ヒントの取得に失敗しました。';
        this.isHintLoading = false;
      },
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

    // Log the answer
    if (isCorrect) {
      this.dataService.addAnswerLog('correct', this.currentCharacter);
    } else {
      this.dataService.addAnswerLog('wrong', this.currentCharacter);
    }

    // モーダルで正解/不正解を表示
    const modalRef = this.confirmService.show(isCorrect, correctAnswer);
    if (modalRef) {
      modalRef.onHidden?.subscribe(() => {
        this.loadQuestion();
      });
    }
  }
}
