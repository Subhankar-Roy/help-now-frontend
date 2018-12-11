import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingpageComponent} from './landingpage/landingpage.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './authentication-guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingpageComponent },
  { path: 'profile', pathMatch: 'full' , component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
