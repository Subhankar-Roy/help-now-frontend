import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LandingpageService} from '../services/landingpage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  profileURL: string;
  constructor(private router: Router, private lps: LandingpageService) { }

  ngOnInit() {
    this.isLoggedIn = this.lps.checkLogin();
    this.profileURLMatchMaker();
  }
  /**
   * logout the current session
   */
  logout() {
    if (localStorage.getItem('_token')) {
      localStorage.removeItem('_token');
      localStorage.removeItem('_cu');
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    }
  }

  /**
   * make a decision based on user type of profile
   */
  profileURLMatchMaker() {
    if (this.isLoggedIn) {
      switch (JSON.parse(localStorage.getItem('_cu')).user_type) {
        case '1': this.profileURL = '/'; break;
        case '2': this.profileURL = '/'; break;
        case '3': this.profileURL = '/customer-profile'; break;
        case '4': this.profileURL = '/'; break;
        case '5': this.profileURL = '/provider-profile'; break;
        case '6': this.profileURL = '/'; break;
        default: this.profileURL = '/'; break;
      }
    }
  }
}
