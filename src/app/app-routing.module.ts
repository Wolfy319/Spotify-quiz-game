import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "leaderboard", component: HomeComponent },
  { path: "settings", component: ConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
