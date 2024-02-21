import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() track: any;
  @Input() id: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
