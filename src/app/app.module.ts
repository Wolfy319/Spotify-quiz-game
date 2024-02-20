import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ButtonComponent } from './button/button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from "./app-routing.module";
import { ConfigurationComponent } from './configuration/configuration.component';
import { GameOverComponent } from './game-over/game-over.component';
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { GameComponent } from "./game/game.component";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [AppComponent, LeaderboardComponent, GameComponent, HomeComponent, ButtonComponent, NavbarComponent, ConfigurationComponent, GameOverComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), ReactiveFormsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
