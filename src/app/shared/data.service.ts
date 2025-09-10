import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'assets/characters.json';
  private readonly HINT_SETTING_KEY = 'hint';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.dataUrl);
  }

  getAnswerLog(type: 'correct' | 'wrong'): Character[] {
    const log = localStorage.getItem(type);
    return log ? JSON.parse(log) : [];
  }

  addAnswerLog(type: 'correct' | 'wrong', character: Character): void {
    const correctLog = this.getAnswerLog('correct');
    const wrongLog = this.getAnswerLog('wrong');

    // Remove from the opposite list if present
    if (type === 'correct') {
      const indexInWrong = wrongLog.findIndex((c) => c.name === character.name);
      if (indexInWrong > -1) {
        wrongLog.splice(indexInWrong, 1);
        localStorage.setItem('wrong', JSON.stringify(wrongLog));
      }
    } else {
      // type === 'wrong'
      const indexInCorrect = correctLog.findIndex(
        (c) => c.name === character.name,
      );
      if (indexInCorrect > -1) {
        correctLog.splice(indexInCorrect, 1);
        localStorage.setItem('correct', JSON.stringify(correctLog));
      }
    }

    // Add to the target list if not already present
    const targetLog = this.getAnswerLog(type);
    const indexInTarget = targetLog.findIndex((c) => c.name === character.name);
    if (indexInTarget === -1) {
      const updatedLog = [...targetLog, character];
      localStorage.setItem(type, JSON.stringify(updatedLog));
    }
  }

  getHintSetting(): boolean {
    const setting = localStorage.getItem(this.HINT_SETTING_KEY);
    return setting ? JSON.parse(setting) : false; // Default to false(hint enabled)
  }

  setHintSetting(enabled: boolean): void {
    localStorage.setItem(this.HINT_SETTING_KEY, JSON.stringify(enabled));
  }
}
