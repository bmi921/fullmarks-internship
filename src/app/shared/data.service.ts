import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'assets/characters.json';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.dataUrl);
  }

  getAnswerLog(type: 'correct' | 'wrong'): Character[] {
    const log = localStorage.getItem(type);
    return log ? JSON.parse(log) : [];
  }

  addAnswerLog(type: 'correct' | 'wrong', character: Character): void {
    const currentLog = this.getAnswerLog(type);
    const updatedLog = [...currentLog, character];
    localStorage.setItem(type, JSON.stringify(updatedLog));
  }
}
