import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingpageService } from '../services/landingpage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  errFlg: boolean;
  errString: string;
  signUpFormResp: Observable<any>;
  signInFormResp: Observable<any>;
  constructor(private fb: FormBuilder, private lps: LandingpageService, private router: Router) { }
  ngOnInit() {
    this.createRegistrationForm();
    this.createLoginForm();
    this.errFlg = false;
    this.errString = null;
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
   * This function signs up one user
   */
  onSubmit() {
    if (this.registerForm.valid) {
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
        }
      }, error => {
        this.errFlg = true;
        this.errString = error.error.response;
        console.error(this.errString);
      });
    } else {
      this.errFlg = true;
      this.errString = 'Please fill up the form correctly';
      console.error(this.errString);
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
        }
      }, error => {
        this.errFlg = true;
        this.errString = error.error.response;
        console.error(this.errString);
      });
    } else {
      this.errFlg = true;
      this.errString = 'Please fill up the form correctly';
      console.error(this.errString);
    }
  }
}
