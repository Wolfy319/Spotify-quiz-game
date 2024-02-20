import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  settingsFormGroup: FormGroup = new FormGroup({
    volume: new FormControl<number>(100),
    rounds: new FormControl<number>(3),
    songChoices: new FormControl<number>(4)
  })

  constructor() { }

  ngOnInit(): void {
  }

}
