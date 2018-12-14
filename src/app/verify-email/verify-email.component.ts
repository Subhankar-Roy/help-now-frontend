import { Component, OnInit } from '@angular/core';
import { VerifyEmailService } from '../services/verify-email.service';
import {Observable} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  verifyEmailResp: Observable<any>;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private ves: VerifyEmailService) { }

  ngOnInit() {
    this.verifyEmail();
  }

  /**
   * verify email id
   */
  verifyEmail() {
    if (this.activatedRoute.snapshot.root.children['0'].params.token.length > 0) {
      this.verifyEmailResp = this.ves.verifyEmail(this.activatedRoute.snapshot.root.children['0'].params.token);
      this.verifyEmailResp.subscribe(data => {
        if (data.status) {
          if (data.response.metadata === '3') {
            this.router.navigate(['/customer-profile']);
          } else {
            this.router.navigate(['/provider-profile']);
          }
        } else {
          console.error('Could not be able to verify your email');
        }
      }, error => {
        console.log(error.error.response);
      });
    } else {
      this.router.navigate(['/404']);
    }
  }
}
