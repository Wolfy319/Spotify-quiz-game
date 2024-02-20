import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
