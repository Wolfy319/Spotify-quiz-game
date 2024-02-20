import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameOverComponent } from './game-over/game-over.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "leaderboard", component: LeaderboardComponent },
  { path: "settings", component: ConfigurationComponent},
  { path: "game",component: GameComponent},
  { path: "gameover",component: GameOverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
