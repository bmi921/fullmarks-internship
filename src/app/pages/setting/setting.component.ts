import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  prefectures: string[] = [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
    '鳥取県',
    '島根県',
    '岡山県',
    '広島県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県',
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県',
  ];

  selectedPrefectures: Set<string> = new Set<string>();
  localStorageKey = 'selectedPrefectures';
  isHintEnabled: boolean = true;
  selectedQuestionType: string = 'random'; // Default to random

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadPrefecturesFromLocalStorage();
    this.isHintEnabled = this.dataService.getHintSetting();
    const storedQuestionType = localStorage.getItem('questionType');
    if (storedQuestionType) {
      this.selectedQuestionType = storedQuestionType;
    }
  }

  saveQuestionTypeSetting(): void {
    localStorage.setItem('questionType', this.selectedQuestionType);
  }

  isPrefectureSelected(prefecture: string): boolean {
    return this.selectedPrefectures.has(prefecture);
  }

  togglePrefecture(prefecture: string, event: any): void {
    if (event.target.checked) {
      this.selectedPrefectures.add(prefecture);
    } else {
      this.selectedPrefectures.delete(prefecture);
    }
    this.savePrefecturesToLocalStorage();
  }

  toggleHintSetting(event: any): void {
    this.isHintEnabled = event.target.checked;
    this.dataService.setHintSetting(this.isHintEnabled);
  }

  selectAll(): void {
    this.prefectures.forEach((prefecture) =>
      this.selectedPrefectures.add(prefecture),
    );
    this.savePrefecturesToLocalStorage();
  }

  deselectAll(): void {
    this.selectedPrefectures.clear();
    this.savePrefecturesToLocalStorage();
  }

  private savePrefecturesToLocalStorage(): void {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(Array.from(this.selectedPrefectures)),
    );
  }

  private loadPrefecturesFromLocalStorage(): void {
    const storedPrefectures = localStorage.getItem(this.localStorageKey);
    if (storedPrefectures) {
      const parsedPrefectures: string[] = JSON.parse(storedPrefectures);
      this.selectedPrefectures = new Set<string>(parsedPrefectures);
    } else {
      // If nothing is stored, select all by default as per common UX for initial setup
      this.selectAll();
    }
  }
}
