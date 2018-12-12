import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './authentication-guard/auth.guard';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ProviderGuard } from './authentication-guard/provider.guard';
import { CustomerGuard } from './authentication-guard/customer.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingpageComponent },
  { path: 'provider-profile', pathMatch: 'full' , component: ProfileComponent, canActivate: [AuthGuard, ProviderGuard] },
  { path: 'customer-profile', pathMatch: 'full', component: CustomerProfileComponent, canActivate: [AuthGuard, CustomerGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
