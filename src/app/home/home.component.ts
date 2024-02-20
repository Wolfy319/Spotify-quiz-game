import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, AbstractControlOptions } from "@angular/forms";
import fetchFromSpotify, { request } from "../../services/api";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  genres: String[] = ["Rock",
  "Rap",
  "Pop",
  "Country",
  "Hip-Hop",
  "Jazz",
  "Alternative",
  "K-pop",
  "J-pop",
  "Emo"];

  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";

  checkDateValidator: ValidatorFn = (form: AbstractControl):  ValidationErrors |  null  =>{
    let fromYearValue = form.get('yearsFrom')
    let toYearValue = form.get('yearsTo')

    if(!fromYearValue || !toYearValue) {
      return null
    }
    if (fromYearValue.value > toYearValue.value) {
      return { invalidRange: true }
    }

    return null
  }

  homeGameForm: FormGroup = new FormGroup({
    yearsFrom: new FormControl<number>(1999, [Validators.required, Validators.min(1500), Validators.max(2024)]),
    yearsTo: new FormControl<number>(2010, [Validators.required, Validators.min(1500), Validators.max(2024)]),
    selectedGenre: new FormControl<string>("rock"),
  },
   {validators: [this.checkDateValidator]},
  );



  ngOnInit(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.configLoading=false;
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.configLoading = false;
    });
  }

  testApi = (t: any) => {
    fetchFromSpotify({token:t, endpoint:"search", params: {q:`year:${this.homeGameForm.controls["yearsFrom"].value}-${this.homeGameForm.controls["yearsTo"].value}%20genre:${this.homeGameForm.controls['selectedGenre'].value}&type=track`} })
    .then((response) => console.log(response))
  }

}
