import { Component, OnInit } from '@angular/core';
import { SongsService } from '../services/songs.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  constructor(private songData: SongsService) { }

  ngOnInit(): void {

  }

}
