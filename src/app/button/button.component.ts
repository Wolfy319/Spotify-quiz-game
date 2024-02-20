import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {


  @Input() linkText: string;
  @Input() text: string;
  constructor() {
    this.linkText = '';
    this.text = '';
  }

  navigateTo(text: string) {
    // route to the text


  }

}
