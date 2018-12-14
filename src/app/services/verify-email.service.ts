import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  constructor(private http: HttpClient) { }

  /**
   * send api request to backend to verify the email
   * @param verification_id
   */
  verifyEmail(verification_id: number) {
    return this.http.get(environment.API_URL + 'verify-email/user/' + verification_id);
  }
}
