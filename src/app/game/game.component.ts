import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';
import { SongsService } from '../services/songs.service';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private songData: SongsService, private settingsData: SettingsService, private router: Router, private gameData: GameService, private settingData: SettingsService) { }

  mode: string = "Regular"
  regularMode: boolean = true; 
  hider: boolean = false;
  correct: any;
  sound: Howl = new Howl({src: [""]});
  @Output() score: number = 0;
  volume: number = 0;
  choices: any[] = [];
  round: number = 0;
  picked: number = 0;
  end: boolean = false;
  rounds: number = 3;
  options: number = 4;

  loadedRounds: Track[][] = []

  @Output() choose = new EventEmitter();


  endGame(){
    this.sound.stop();
    this.gameData.updateScore(this.score)
    this.gameData.updateMode(this.mode)
    console.log(this.score)
    this.router.navigateByUrl('/gameover')
  }

  ngOnInit(): void {
    this.settingsData.currentNumRounds.subscribe((numRounds) => this.rounds = numRounds)
    this.settingsData.currentNumSongChoices.subscribe((numSongs) => this.options = numSongs)
    this.gameData.currentMode.subscribe((modeData) => {this.mode = modeData; this.regularMode = modeData === "Regular" ? true: false})
    this.settingData.currentVolume.subscribe((x)=> {this.volume = x;});
    this.songData.currentRounds.subscribe((currentRounds) => {
      this.loadedRounds = currentRounds;
      this.rounds = currentRounds.length;
      this.options = currentRounds[0].length;
      this.buildGame()
    })
    this.end = false;
  }

  buildGame(): void{
    this.picked = 0;
    this.correct = null;
    this.choices = [];
    for(let i = 0; i < this.options; i++){
      let info: any =  this.loadedRounds[this.round][i]
      this.choices.push({id: i + 1, info: info});
      this.correct = this.choices[Math.floor(Math.random() * this.choices.length)];
    }
    this.sound = new Howl({
      src:[this.correct['info']['previewUrl']],
      volume: this.volume/100,
      html5: true
    });
  }

  playMusic(){
    if(!this.sound.playing()){
      this.sound.play();
    }
    else{
      this.sound.pause();
    }
  }
  nextGame(): void{
    this.sound.stop();
    this.round+=1;
    this.buildGame();
    this.hider = !this.hider;
    console.log(this.round);
    
  }

  addScore(){
    if(this.picked == this.correct["id"]){
    this.score += this.options;
    }
    else if(!this.regularMode){
      this.end = true;
    }
  }

  onPress(picked: any){
    this.picked = picked['id'];
  }

  onSubmit(): void{
    this.sound.stop();
    if(this.picked == 0){
      throw "need to pick one.";
    }
    else{
      this.hider = true;
    }
    if(this.regularMode){
      if(this.rounds > this.round + 1 + 1){
        this.end = false;
      }
      else if(this.rounds <= this.round + 1 + 1){
        this.end = true;
      }
    }
    else{
      this.end = false;
    }
    this.addScore();


  }

}
