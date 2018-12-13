import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TokenValidation } from '../models/TokenValidation';
import {UpdateForgottenPassword} from '../models/UpdateForgottenPassword';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  /**
   * check the token is valid or not i.e token only gets valid for 10 mins check environment for more
   * @param token
   */
  checkStatusToken(token: TokenValidation) {
    return this.http.post(environment.API_URL + 'user/request/checkstatus' , token);
  }

  /**
   * when user updates the password this url should get called to make changes in db
   * @param userData
   */
  updatePassword(userData: UpdateForgottenPassword) {
    return this.http.post(environment.API_URL + 'reset-password/user/' + userData.token, userData);
  }
}
