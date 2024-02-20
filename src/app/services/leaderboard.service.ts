import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  scores: any[] = [];
  constructor() { }

  addScore(score: any){
    this.scores.push({name: "pizza", score: 14, type: "infinite"});
  }

  getScores(){
    return this.scores;
  }
}
