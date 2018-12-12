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
    return this.http.get('http://google.com');
  }


}
