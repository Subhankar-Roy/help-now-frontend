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
  constructor(private router: Router, private lps: LandingpageService) { }

  ngOnInit() {
    this.isLoggedIn = this.lps.checkLogin();
  }
  /**
   * logout the current session
   */
  logout() {
    if (localStorage.getItem('_token')) {
      localStorage.removeItem('_token');
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    }
  }
}
