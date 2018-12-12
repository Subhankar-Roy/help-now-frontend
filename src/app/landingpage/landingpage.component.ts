import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingpageService } from '../services/landingpage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorBagServiceService } from '../services/error-bag-service.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  errFlg: boolean;
  errString: string;
  errArray: any;
  successFlg: boolean;
  successString: string;
  signUpFormResp: Observable<any>;
  signInFormResp: Observable<any>;
  forgotPasswordFormResp: Observable<any>;
  constructor(private fb: FormBuilder, private lps: LandingpageService, private router: Router, private ebs: ErrorBagServiceService) { }
  ngOnInit() {
    this.createRegistrationForm();
    this.createLoginForm();
    this.errFlg = false;
    this.errString = null;
    this.errArray = [];
    this.createForgotPasswordForm();
  }

  /**
   * This function creates the reactive form for sign up
   */
  createRegistrationForm() {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mobile_phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      is_provider: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  /**
   * This function creates reactive form for signin
   */
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * This function creates forgot password form
   */
  createForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  /**
   * This function signs up one user
   */
  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.confirm_password) {
        this.signUpFormResp = this.lps.signUp(this.registerForm.value);
        this.signUpFormResp.subscribe(data => {
          if (data.status) {
            // to hide the modal
            document.getElementById('register').click();
            localStorage.setItem('_token', data.response.metadata.original.response.token);
            localStorage.setItem('_cu', JSON.stringify(data.response.metadata.original.response.authenticated_user));
            this.router.navigate([this.registerForm.value.is_provider ? 'provider-profile' : 'customer-profile']);
          } else {
            this.errFlg = true;
            this.errString = 'Failed to sign you up ' + this.registerForm.value.first_name + ' . Please try again later!';
            console.error(this.errString);
            this.globalErrorTimeout();
          }
        }, error => {
          this.errFlg = true;
          this.errArray = this.ebs.ObjectToKey(error.error.response, Object.keys(error.error.response)[0]);
          this.globalErrorTimeout();
        });
      } else {
        this.errFlg = true;
        this.errString = 'Password and confirm password did not match!';
        console.error(this.errString);
        this.globalErrorTimeout();
      }
    } else {
      this.errFlg = true;
      this.errString = 'Please fill up the form correctly';
      console.error(this.errString);
      this.globalErrorTimeout();
    }
  }
  /**
   * This functions log user in
   */
  login() {
    if (this.loginForm.valid) {
      this.signInFormResp = this.lps.signIn(this.loginForm.value);
      this.signInFormResp.subscribe(data => {
        if (data.status) {
          document.getElementById('signin').click();
          localStorage.setItem('_token', data.response.token);
          localStorage.setItem('_cu', JSON.stringify(data.response.authenticated_user));
          this.router.navigate([data.response.authenticated_user.user_type === '5' ? 'provider-profile' : 'customer-profile']);
        } else {
          this.errFlg = true;
          this.errString = 'Failed to sign you In ' + this.loginForm.value.email + ' . Please try again later!';
          console.error(this.errString);
          this.globalErrorTimeout();
        }
      }, error => {
        this.errFlg = true;
        this.errString = error.error.response;
        console.error(this.errString);
        this.globalErrorTimeout();
      });
    } else {
      this.errFlg = true;
      this.errString = 'Please fill up the form correctly';
      console.error(this.errString);
      this.globalErrorTimeout();
    }
  }

  /**
   * Helps to reset the password
   */
  forgotPasswordRequest() {
    if (this.forgotPasswordForm.valid) {
      this.forgotPasswordFormResp = this.lps.forgotPassword(this.forgotPasswordForm.value);
      this.forgotPasswordFormResp.subscribe(data => {
        console.log(data);
      }, error => {
        this.errFlg = true;
        this.errString = error.error.response;
        this.globalErrorTimeout();
      });
    } else {
      this.errFlg = true;
      this.errString = 'Please fill up the form correctly!';
    }
  }

  /**
   * Hides error message after a certain period
   */
  globalErrorTimeout() {
    const con = this;
    setTimeout(function () {
      con.errFlg = false;
    }, environment.GLOBAL_ERR_TIMEOUT);
  }
}
