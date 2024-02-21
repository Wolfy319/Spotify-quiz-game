import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';
import { SongsService } from '../services/songs.service';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

interface Track {
	title: string
	year: string
	albumName: string
	albumCoverUrl: string
	artists: string[]
	previewUrl: string
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit {
  constructor(private songData: SongsService, private settingsData: SettingsService, private router: Router, private gameData: GameService) { }

  mode: string = "Regular"
  regularMode: boolean = true; 
  hider: boolean = false;
  correct: any;
  @Output() score: number = 0;
  choices: any[] = [];
  round: number = 0;
  picked: number = 0;
  end: boolean = false;
  rounds: number = 3;
  options: number = 4;

  loadedRounds: Track[][] = []

  @Output() choose = new EventEmitter();


  endGame(){
    this.gameData.updateScore(this.score)
    this.gameData.updateMode(this.mode)
    console.log(this.score)
    this.router.navigateByUrl('/gameover')
  }

  ngOnInit(): void {
    this.settingsData.currentNumRounds.subscribe((numRounds) => this.rounds = numRounds)
    this.settingsData.currentNumSongChoices.subscribe((numSongs) => this.options = numSongs)
    this.gameData.currentMode.subscribe((modeData) => {this.mode = modeData; this.regularMode = modeData === "Regular" ? true: false})
    this.songData.currentRounds.subscribe((currentRounds) => {
      this.loadedRounds = currentRounds;
      this.buildGame()
    })
    this.end = false;
  }

  buildGame(): void{
    this.picked = 0;
    this.correct = null;
    this.choices = []
    for(let i = 0; i < this.options; i++){
      let info: any =  this.loadedRounds[this.round][i]
      this.choices.push({id: i + 1, info: info});
      this.correct = this.choices[Math.floor(Math.random() * this.choices.length)];
  }
}

  playMusic(){
    var sound = new Howl({
      src:[this.correct['info']['previewUrl']]
    });
    console.log(sound);
    sound.play()
  }
  nextGame(): void{
    this.buildGame();
    this.round+=1;
    this.hider = !this.hider;
    
  }

  addScore(){
    if(this.picked == this.correct["id"]){
    this.score += 1;
    }
    else if(!this.regularMode){
      this.end = true;
    }
  }

  onPress(picked: any){
    this.picked = picked['id'];
  }

  onSubmit(): void{
    if(this.picked == 0){
      throw "need to pick one.";
    }
    else{
      this.hider = true;
    }
    if(this.regularMode){
      if(this.rounds > this.round + 1){
        this.end = false;
      }
      else if(this.rounds <= this.round + 1){
        this.end = true;
      }
    }
    else{
      this.end = false;
    }
    this.addScore();


  }

}
