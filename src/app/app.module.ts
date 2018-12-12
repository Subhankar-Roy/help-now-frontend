import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorhandleComponent } from './errorhandle/errorhandle.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingpageService } from './services/landingpage.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './authentication-guard/auth.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { SuccessHandlerComponent } from './success-handler/success-handler.component';
import { ErrorBagServiceService } from './services/error-bag-service.service';
import { NgxMaskModule } from 'ngx-mask';
import { ProviderGuard } from './authentication-guard/provider.guard';
import { CustomerGuard } from './authentication-guard/customer.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    FooterComponent,
    ErrorhandleComponent,
    ProfileComponent,
    ForgotpasswordComponent,
    CustomerProfileComponent,
    ErrorHandlerComponent,
    SuccessHandlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ReactiveFormsModule, LandingpageService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, ErrorBagServiceService, ProviderGuard, CustomerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
