import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import fetchFromSpotify from "src/services/api";

interface Track {
	title: string
	year: string
	albumName: string
	albumCoverUrl: string
	artists: string[]
	previewUrl: string
}

interface Round {
	tracks: Track[]
}


@Injectable({
	providedIn: 'root'
})


export class SongsService {

	token: string = "";
	params: any;

	private roundsSource = new BehaviorSubject<Track[][]>([])
	currentRounds = this.roundsSource.asObservable()
	
	clearTracks(): void {
		this.roundsSource.next([])
	}

	getRounds({token, params = this.params, numChoices}: any): void {
		this.fetchTracks({token:token, params:params})
		.then((tracks) => {
			let rounds = []
			if(tracks) {
				for(let i = 0; i < tracks.length; i += numChoices) { 
					rounds.push(tracks.slice(i, i + numChoices))
				}
			}
			
			return rounds
		})
		.then((rounds) => {
			this.roundsSource.next(rounds)
		})
		.catch(err => console.log(err))
		this.token = token;
		this.params = params;
	}

	fetchTracks = ({token, params}: any) => {
		return fetchFromSpotify({token:token, endpoint:"search", params: params})
		.then((response) => {
			let tracks: Track[] = []
			for(let track of response.tracks.items) {
				tracks.push({
					title: track.name,
					year: this.parseDate(track.album.release_date),
					albumName: track.album.name,
					albumCoverUrl: track.album.images[0].url,
					artists: track.album.artists.map((artistObj: any) => artistObj.name),
					previewUrl: track.preview_url
				})
				
			}
			return tracks
		})
		.catch(err => console.log(err))
	}

	parseDate(date:string): string {
		return date.slice(5, 7) + "/" + date.slice(8,10) + "/" + date.slice(0,4)
	}

	refetch = (numChoices: number) => {
		this.params["offset"] = Math.floor(Math.random() * 1000);
		return this.getRounds({token: this.token, params: this.params, numChoices: numChoices});
	}
	
}