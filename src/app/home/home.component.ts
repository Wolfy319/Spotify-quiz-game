import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, AbstractControlOptions } from "@angular/forms";
import fetchFromSpotify, { request } from "../../services/api";
import { SettingsService } from "../services/settings.service";
import { SongsService } from "../services/songs.service";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

interface Track {
	title: string
	year: string
	albumName: string
	albumCoverUrl: string
	artists: string[]
	previewUrl: string
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private songData: SongsService, private settingsData: SettingsService) {}

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
  tracks: Track[] = [{title: "", year: "", albumName: "", albumCoverUrl: "", artists: [""], previewUrl: ""}]
  rounds: Track[][] = []
  numRounds: number = 0
  numChoices: number = 0

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
    this.songData.currentRounds.subscribe((currentRounds) => this.rounds = currentRounds)
    this.settingsData.currentNumRounds.subscribe((numRounds) => this.numRounds = numRounds)
    this.settingsData.currentNumSongChoices.subscribe((numChoices) => this.numChoices = numChoices)
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

  startGame = (t: any) => {
    const from = this.homeGameForm.controls["yearsFrom"].value
    const to = this.homeGameForm.controls["yearsTo"].value
    const genre = this.homeGameForm.controls['selectedGenre'].value
    this.songData.getRounds({token: t, params: {q:`year:${from}-${to}%20genre:${genre}&type=track`, limit: (this.numChoices * this.numRounds), offset: Math.floor(Math.random() * 1000)}, numChoices: this.numChoices})
  }

}
