import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  hider: boolean = false;
  correct: any;
  @Output() score: number = 0;
  choices: any[] = [];
  round: number = 1;
  picked: number = 0;
  @Input() rounds: number = 3;
  @Input() options: number = 3;

  @Output() choose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
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
    console.log(this.score);
  }

  onPress(picked: any){
    this.picked = picked['id'];
  }

  onSubmit(): void{
    this.addScore();
    if(this.picked == 0){
      throw "need to pick one.";
    }
    else{
      this.hider = true;
    }

  }

}
