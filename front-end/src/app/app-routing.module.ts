import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FindComponent } from "./find/find.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  { path: "find", component: FindComponent },
  { path: "details", component: DetailsComponent },
  { path: "", component: HomeComponent },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
