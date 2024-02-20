import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  choices: any[] = [];
  current: number = 1;
  picked: number = 0;
  @Input() rounds: number = 3;
  @Input() options: number = 3;

  @Output() choose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    for(let i = 1; i <= this.options; i++){
    this.choices.push({id: i, info: {album: {name: "hello", release_date_precision: 1980}, name: "Greetins", artist: {name: "Peter"}}});
    }
  }

  nextGame(): void{
    this.current+=1;
    
  }

  onPress(picked: any){
    this.picked = picked['id'];
    console.log(this.picked);
  }

  onSubmit(): void{

  }

}
