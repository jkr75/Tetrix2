import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ScoreService {

  private apiUrl = 'http://scores.chrum.it/scores';

  constructor(private _http: HttpClient) {}

  getScores() {
    return this._http.get<any[]>(this.apiUrl);
  }
}