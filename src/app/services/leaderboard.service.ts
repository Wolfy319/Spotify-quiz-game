import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  scores: any[] = [];
  constructor() { }

  addScore(score: any){
    this.scores.push({name: "matthew", score: 500, type:"infinite"});
    this.scores.push(score);
    this.scores.sort((a,b)=> (a["score"] < b["score"] ? 1:-1));
  }

  getScores(){
    return this.scores;
  }
}
