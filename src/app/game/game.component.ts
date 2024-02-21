import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() regularMode: boolean = true; 
  hider: boolean = false;
  correct: any;
  @Output() score: number = 0;
  choices: any[] = [];
  round: number = 1;
  picked: number = 0;
  end: boolean = false;
  @Input() rounds: number = 3;
  @Input() options: number = 3;

  @Output() choose = new EventEmitter();

  constructor() { }

  emitter(){
    let mode = this.regularMode ? "Regular": "Infinite";
    let fin = {score: this.score, type: mode};
    this.choose.emit(fin);
  }

  ngOnInit(): void {
    this.end = false;
    this.buildGame();

  }

  buildGame(): void{
    this.picked = 0;
    this.correct = null;
    this.choices = [];
    for(let i = 1; i <= this.options; i++){
      this.choices.push({id: i, info: {
        title: "pizza",
        year: "2019",
        albumName: "italian",
        albumCoverUrl: "url",
        artists: ["hawlla","smooth"],
        previewUrl: "hello"}});
      }
  
      this.correct = this.choices[Math.floor(Math.random() * this.choices.length)];
      console.log(this.correct["id"]);
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
      if(this.rounds > this.round){
        this.end = false;
      }
      else if(this.rounds <= this.round){
        this.end = true;
      }
    }
    else{
      this.end = false;
    }
    this.addScore();


  }

}
