import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullViewComponent } from "./full-view/full-view.component";
import { LandingComponent } from "./landing/landing.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'open/:id', component: FullViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
