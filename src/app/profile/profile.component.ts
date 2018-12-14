import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../services/general.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showProfileVerification: boolean;
  checkUserStatusResp: Observable<any>;
  constructor(private gps: GeneralService) { }

  ngOnInit() {
    this.showProfileVerification = true;
    this.checkUserStatus();
  }
  checkUserStatus() {
    this.checkUserStatusResp = this.gps.checkStatusUser({user_id: JSON.parse(localStorage.getItem('_cu')).id});
    this.checkUserStatusResp.subscribe(data => {
      if (data.status) {
        if (data.response.email_verified_at) {
          this.showProfileVerification = false;
        } else {
          this.showProfileVerification = true;
        }
      } else {
        console.error('Something went wrong. Please try again later!');
      }
    }, error => {
      console.error(error.error.response);
    });
  }

}
