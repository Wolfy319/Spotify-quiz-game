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
	private roundsSource = new BehaviorSubject<Track[][]>([])
	currentRounds = this.roundsSource.asObservable()
	
	clearTracks(): void {
		this.roundsSource.next([])
	}

	getRounds({token, params, numChoices}: any): void {
		this.fetchTracks({token:token, params:params})
		.then((tracks) => {
			let rounds = []
			for(let i = 0; i < tracks.length; i += numChoices) { 
				rounds.push(tracks.slice(i, i + numChoices))
			}
			return rounds
		})
		.then((rounds) => {
			this.roundsSource.next(rounds)
		})
	}

	fetchTracks = ({token, params}: any) => {
		return fetchFromSpotify({token:token, endpoint:"search", params: params})
		.then((response) => {
			let tracks: Track[] = []
			for(let track of response.tracks.items) {
				tracks.push({
					title: track.name,
					year: track.album.release_date,
					albumName: track.album.name,
					albumCoverUrl: track.album.images[0],
					artists: track.album.artists.map((artistObj: any) => artistObj.name),
					previewUrl: track.preview_url
				})
				
			}
			return tracks
		})
	}
}