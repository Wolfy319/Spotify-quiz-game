import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() track: any;
  @Input() id: number = 0;
  artistString: string = ""

  constructor() { }

  ngOnInit(): void {
    this.constructArtists()
  }

  constructArtists() {
    this.artistString += this.track['artists']
    let i = 0
    for(i; i < this.track['artists'].length - 1; i++) {
      this.artistString += ", " + this.track['artists'][i]
    }
    if(i == this.track['artists'].length && this.track['artists'].length > 1) {
      this.artistString += ", and " + this.track['artists'][i]
    }
  }
}
