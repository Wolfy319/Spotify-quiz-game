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

@Injectable({
	providedIn: 'root'
})

export class SongsService {
	// used to store fetched tracks for an individual round
	private trackListSource = new BehaviorSubject<Track[]>([{title: "", year: "", albumName: "", albumCoverUrl: "", artists: [""], previewUrl: ""}])
	currentTracks = this.trackListSource.asObservable()

	// // used to store tracks for an individual round
	// private loadedChoicesSource = new BehaviorSubject<Track[]>([{title: "", year: "", albumName: "", albumCoverUrl: "", artists: [""], previewUrl: ""}])
	// currentLoadedChoices = this.loadedChoicesSource.asObservable()

	fetchTracks({token, params}: any): void {
		fetchFromSpotify({token:token, endpoint:"search", params: params})
		.then((response) => {
			let tracks: Track[] = []
			for(let track of response.tracks.items) {
				tracks.push({
					title: track.name,
					year: track.album.release_date,
					albumName: track.album.name,
					albumCoverUrl: track.album.images[0],
					artists: track.album.artists,
					previewUrl: track.preview_url
				})
				
			}
			return tracks
		})
		.then(tracks => this.trackListSource.next(tracks))
		.catch((err) => alert(err.error))
	}


}