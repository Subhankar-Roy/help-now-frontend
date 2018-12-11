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
  errFlg: boolean;
  errString: string;
  signUpFormResp: Observable<any>;
  constructor(private fb: FormBuilder, private lps: LandingpageService, private router: Router) { }

  ngOnInit() {
    this.createRegistrationForm();
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
  onSubmit() {
    if (this.registerForm.valid && this.registerForm.value.is_provider || this.registerForm.value.is_provider === 'true') {
      this.signUpFormResp = this.lps.signUp(this.registerForm.value);
      this.signUpFormResp.subscribe(data => {
        if (data.status) {
            // to hide the modal
            document.getElementById('register').click();
            localStorage.setItem('_token', data.response.metadata.original.response.token);
            this.router.navigate(['profile']);
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
}
