import { Component, OnInit } from '@angular/core';
import { SongsService } from '../services/songs.service';
import { LeaderboardService } from '../services/leaderboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {
  score: number = 0
  mode: string = 'Regular'
  player: string = 'default'
  submitted: boolean = false
  constructor(private leaderboardService: LeaderboardService, private gameData: GameService) { }

  leaderboardForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.min(0), Validators.max(100)]),
  })
  
  ngOnInit(): void {
    this.gameData.currentScore.subscribe((scoreData) => this.score = scoreData)
    this.gameData.currentMode.subscribe((modeData) => this.mode = modeData)
  }

  onPress(){
    this.leaderboardService.addScore({name: this.leaderboardForm.controls['name'].value, score: this.score, type: this.mode});
    this.submitted = true
  }

}
