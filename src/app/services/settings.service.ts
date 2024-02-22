import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root',
})

export class SettingsService {
	private volumeSource = new BehaviorSubject<number>(100)
	currentVolume = this.volumeSource.asObservable()

	private numRoundsSource = new BehaviorSubject<number>(3)
	currentNumRounds = this.numRoundsSource.asObservable()

	private numSongChoicesSource = new BehaviorSubject<number>(3)
	currentNumSongChoices = this.numSongChoicesSource.asObservable()

	updateVolume(volume: number) {
		this.volumeSource.next(volume)
	}

	updateNumRounds(numRounds: number) {
		this.numRoundsSource.next(numRounds)
	}

	updateNumChoices(numChoices: number) {
		this.numSongChoicesSource.next(numChoices)
	}
}