import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { Login } from '../models/Login';
import {ForgotPassword} from '../models/ForgotPassword';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  constructor(private http: HttpClient) { }

  /**
   * signs up one user to backend
   * @param userData
   */
  signUp(userData: User) {
    if (userData.is_provider) {
      return this.http.post(environment.API_URL + 'provider/sign-up', userData);
    } else {
      return this.http.post(environment.API_URL + 'customer/create', userData);
    }
  }

  /**
   * sign in the user
   * @param userData
   */
  signIn(userData: Login) {
    return this.http.post(environment.API_URL + 'login', userData);
  }
  /**
   * check a user is logged in or not
   */
  checkLogin(): boolean {
    if (localStorage.getItem('_token')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * this function sends a request to backend for sending email forgot password
   * @param userData
   */
  forgotPassword(userData: ForgotPassword) {
    return this.http.post(environment.API_URL + 'user/request/updatepassword', userData);
  }
}
