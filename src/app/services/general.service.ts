import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
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
}
