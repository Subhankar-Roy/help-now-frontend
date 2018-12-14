import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }
  /**
   * Hides error message after a certain period
   */
  globalErrorTimeout(context) {
    const con = context;
    setTimeout(function () {
      con.errFlg = false;
    }, environment.GLOBAL_ERR_TIMEOUT);
  }

  /**
   * hides the success message after a certain period
   */
  globalSuccessTimeout(context) {
    const con = context;
    setTimeout(function () {
      con.successFlg = false;
    }, environment.GLOBAL_ERR_TIMEOUT);
  }

  /**
   * check user status verified or not
   * @param userData
   */
  checkStatusUser(userData: any) {
    return this.http.post(environment.API_URL + 'check-user-status/', userData);
  }
}
