import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  /**
   * Get users personal information
  */
  getCustomerPersonalinfo() {
    return this.http.get(environment.API_URL + 'customer/fetch/personalinfo');
  }

  getCustomerProfessionalinfo() {
    return this.http.get(environment.API_URL + 'customer/fetch/professionalinfo');
  }
  getCustomerDemographicinfo() {
    return this.http.get(environment.API_URL + 'customer/fetch/demographyinfo');
  }
  getCustomerPaymentinfo() {
    return this.http.get(environment.API_URL + 'customer/fetch/paymentinfo');
  }
  getCustomerPropertyinfo() {
    return this.http.get(environment.API_URL + 'customer/fetch/allproperty');
  }
  getCustomerAccountinfo() {
    return this.http.get(environment.API_URL + 'customer/fetch/accountsettings');
  }


}
