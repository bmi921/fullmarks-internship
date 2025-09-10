import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

  constructor(private http: HttpClient) {}

  getCompletion(prompt: string): Observable<string> {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-goog-api-key': environment.geminiApiKey,
    });

    return this.http
      .post<any>(this.apiUrl, requestBody, { headers })
      .pipe(map((response) => response.candidates[0].content.parts[0].text));
  }
}
