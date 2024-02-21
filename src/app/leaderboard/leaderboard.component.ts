import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  scores = this.leaderboardService.getScores();

  @Input() player: any = {name: 'hello', score: 150, type: 'regular'};

  @Input() hider: boolean = true;

  @Output() sender = new EventEmitter<any>;
  constructor(  private leaderboardService: LeaderboardService) {

   }

  ngOnInit(): void {
    this.sender.emit(this.scores);
  }

  onPress(person: any){
    this.leaderboardService.addScore(person);
  }



}