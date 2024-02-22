import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.css']
})
export class LeaderboardPageComponent implements OnInit {

  Reg: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  switch (){
    this.Reg = !this.Reg;
  }

}
