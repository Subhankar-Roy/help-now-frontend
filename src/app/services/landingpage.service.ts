import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {User} from '../models/User';

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
    return this.http.post(environment.API_URL + '/sign-up', userData);
  }
}
