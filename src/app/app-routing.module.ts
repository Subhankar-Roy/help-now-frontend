import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './authentication-guard/auth.guard';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ProviderGuard } from './authentication-guard/provider.guard';
import { CustomerGuard } from './authentication-guard/customer.guard';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingpageComponent },
  { path: 'provider-profile', pathMatch: 'full' , component: ProfileComponent, canActivate: [AuthGuard, ProviderGuard] },
  { path: 'customer-profile', pathMatch: 'full', component: CustomerProfileComponent, canActivate: [AuthGuard, CustomerGuard] },
  { path: 'reset-password/user/:token', pathMatch: 'full', component: PasswordResetComponent },
  { path: 'verify-email/user/:token' , pathMatch: 'full', component: VerifyEmailComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
