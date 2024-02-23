import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  scores = this.leaderboardService.getScores();
  @Input() Regular = true;
  @Output() sender = new EventEmitter<any>;
  constructor(  private leaderboardService: LeaderboardService) {

   }

  ngOnInit(): void {
    this.sender.emit(this.scores);
  }

  getRegular(){
    return this.scores.filter((x) =>  x["type"] == "Regular" );
  }
  getInfinite(){

    return this.scores.filter((x) =>  x["type"] == "Infinite" );
  }

  switch(regular: boolean){
    this.Regular = regular;
  }





}
