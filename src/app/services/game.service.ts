import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root',
})

export class GameService {
	private scoreSource = new BehaviorSubject<number>(0)
	currentScore = this.scoreSource.asObservable()

	private modeSource = new BehaviorSubject<string>('Regular')
	currentMode = this.modeSource.asObservable()

	updateScore(score: number) {
		this.scoreSource.next(score)
	}

	updateMode(mode: string) {
		this.modeSource.next(mode)
	}
}