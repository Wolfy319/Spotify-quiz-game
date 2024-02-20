import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  hider: boolean = false;
  correct: any;
  choices: any[] = [];
  round: number = 1;
  picked: number = 0;
  @Input() rounds: number = 3;
  @Input() options: number = 3;

  @Output() choose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.buildGame();
    console.log(this.correct["info"]);

  }

  buildGame(): void{
    this.picked = 0;
    this.correct = null;
    this.choices = [];
    for(let i = 1; i <= this.options; i++){
      this.choices.push({id: i, info: {album: {name: "hello", release_date_precision: 1980}, name: "Greetins", artist: {name: "Peter"}}});
      }
  
      this.correct = this.choices[Math.floor(Math.random() * this.choices.length)];
  }

  nextGame(): void{
    this.buildGame();
    this.round+=1;
    this.hider = !this.hider;
    console.log(this.round);
    
  }

  onPress(picked: any){
    this.picked = picked['id'];
    console.log(this.picked);
  }

  onSubmit(): void{
    if(this.picked == 0){
      throw "need to pick one.";
    }
    else{
      this.hider = true;
    }

  }

}
