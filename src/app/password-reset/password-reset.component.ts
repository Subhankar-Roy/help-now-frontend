import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { PasswordResetService } from '../services/password-reset.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  tokenValidationResp: Observable<any>;
  errFlg: boolean;
  errString: string;
  successFlg: boolean;
  successString: string;
  resetPasswordForm: FormGroup;
  resetPasswordFormResp: Observable<any>;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private prs: PasswordResetService, private fb: FormBuilder, private gs: GeneralService) {
  }

  ngOnInit() {
    this.checkTokenValidation();
    this.errFlg = false;
    this.errString = '';
    this.successFlg = false;
    this.successString = '';
    this.createResetPasswordForm();
  }

  /**
   * before giving access to page check the token is valid or not
   */
  checkTokenValidation() {
    if (this.activatedRoute.snapshot.root.children['0'].params.token.length > 0) {
        this.tokenValidationResp = this.prs.checkStatusToken({token: this.activatedRoute.snapshot.root.children['0'].params.token});
        this.tokenValidationResp.subscribe(data => {
          if (data.status) {
            if (<number>data.response.metadata.timesago <= environment.TOKEN_VALIDATION_TIME) {
                this.successFlg = true;
                this.successString = 'Please reset your password';
              this.gs.globalSuccessTimeout(this);
            } else {
              this.errFlg = true;
              this.errString = 'The link has expired';
              this.router.navigate(['/404']);
            }
          } else {
            this.errFlg = true;
            this.errString = 'Something went wrong! Please try again later.';
            this.router.navigate(['/404']);
          }
        }, error => {
          this.errFlg = true;
          this.errString = error.error.response;
          this.router.navigate(['/404']);
        });
    } else {
      this.router.navigate(['/404']);
    }
  }
  createResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  submitResetPassword() {
    if (this.resetPasswordForm.valid) {
      if (this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirm_password) {
        this.resetPasswordForm.value.token = this.activatedRoute.snapshot.root.children['0'].params.token;
        this.resetPasswordFormResp = this.prs.updatePassword(this.resetPasswordForm.value);
        this.resetPasswordFormResp.subscribe(data => {
          if (data.status) {
            this.router.navigate(['/']);
          } else {
            this.errFlg = true;
            this.errString = 'Failed to update password in database. Please try again later.';
            this.gs.globalErrorTimeout(this);
          }
        }, error => {
          this.errFlg = true;
          this.errString = error.error.response;
          this.gs.globalErrorTimeout(this);
        });
      } else {
        this.errFlg = true;
        this.errString = 'Password and confirm password did not match! Please type the same password in both the cases and it should be minimum 8 characters long.';
        this.gs.globalErrorTimeout(this);
      }
    } else {
      this.errFlg = true;
      this.errString = 'Please fill up the form correctly!';
      this.gs.globalErrorTimeout(this);
    }
  }
}
