import { Component, OnInit } from '@angular/core';
import { Customerpersonalinfo } from '../models/Customerpersonalinfo';
import { Customerpaymentinfo } from '../models/Customerpaymentinfo';
import { Customerdemographicsinfo } from '../models/Customerdemographicsinfo';
import { Customerprofessional } from '../models/Customerprofessional';
import { CustomerService } from '../services/customer.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customerPersonalinfoResp: Observable<any>;
  customerProfessionalinfoResp: Observable<any>;
  customerDemographicinfoResp: Observable<any>;
  customerAccountinfoResp: Observable<any>;
  customerPaymentinfoResp: Observable<any>;
  customerPropertyinfoResp: Observable<any>;

  customerpersonalinfo: Customerpersonalinfo;
  customerpaymentinfo: Customerpaymentinfo;
  customerdemographicsinfo: Customerdemographicsinfo;
  customerprofessionalinfo: Customerprofessional;

  constructor(private cs: CustomerService) { }

  ngOnInit() {
    // this.getProfessionalInfo();
    this.getPersonalInfo();
    // this.getDemographicInfo();
    // this.getPaymentInfo();
    //this.getPropertyInfo();
    //this.getAccountInfo();

  }

  getPersonalInfo(): void {
    console.log(this.customerpersonalinfo);
    // this.customerPersonalinfoResp = this.cs.getCustomerPersonalinfo();
    // this.customerPersonalinfoResp.subscribe(data => {
    //   if (data.status) {
    //     console.log('skjdfjklsdfjs ' + this.customerpersonalinfo);
    //     this.customerpersonalinfo = {
    //       fname: data.response.personalinfo.first_name,
    //       mname: data.response.personalinfo.middle_name,
    //       lname: data.response.personalinfo.last_name,
    //       phone: data.response.personalinfo.phone,
    //       email: data.response.user.email,
    //       customerid: data.response.personalinfo.custom_user_id,
    //       password: data.response.user.password,
    //       street: data.response.personalinfo.street,
    //       po: data.response.personalinfo.po,
    //       city: data.response.personalinfo.city,
    //       state: data.response.personalinfo.state,
    //       zip: data.response.personalinfo.zip
    //     };
    //   } else {

    //   }
    // }, error => {
    //   console.error(error.error);
    // });
  }
  getProfessionalInfo(): void {
    this.customerProfessionalinfoResp = this.cs.getCustomerProfessionalinfo();
    this.customerProfessionalinfoResp.subscribe(data => {
      if (data.status) {
        this.customerprofessionalinfo = {
          status: data.response.professionalstatus,
          emp_name: data.response.professionalinfo.employer_name,
          title: data.response.professionalinfo.designation,
          work_phone: data.response.professionalinfo.phone,
          work_email: data.response.user.email,
          street: data.response.personalinfo.street,
          po: data.response.personalinfo.po,
          city: data.response.personalinfo.city,
          state: data.response.personalinfo.state,
          zip: data.response.personalinfo.zip
        };
      } else {

      }
    }, error => {
      console.error(error.error);
    });
  }
  getDemographicInfo(): void {
    this.customerDemographicinfoResp = this.cs.getCustomerDemographicinfo();
    this.customerDemographicinfoResp.subscribe(data => {
      if (data.status) {
        this.customerdemographicsinfo = {
          status: data.response.demostatus,
          language: data.response.demographicinfo.language,
          gender: data.response.demographicinfo.gender,
          birthday: data.response.demographicinfo.birthday,
          ethnicity: data.response.demographicinfo.ethnicity,
          relationship: data.response.demographicinfo.relationship,
          education: data.response.demographicinfo.education,
          occupation: data.response.demographicinfo.occupation
        };
      } else {

      }
    }, error => {
      console.error(error.error);
    });
  }

  getPaymentInfo(): void {
    this.customerPaymentinfoResp = this.cs.getCustomerPaymentinfo();
    this.customerPaymentinfoResp.subscribe(data => {
      if (data.status) {
        this.customerpaymentinfo = {
          status: data.response.paymentstatus,
          card_type: data.response.paymentinfo.card_type,
          account_number: data.response.paymentinfo.account_number,
          expiration: data.response.paymentinfo.expiration,
          name_on_card: data.response.paymentinfo.name_on_card,
          security_code: data.response.paymentinfo.security_code,
          street: data.response.paymentinfo.street,
          po: data.response.paymentinfo.po,
          city: data.response.paymentinfo.city,
          state: data.response.paymentinfo.state,
          zip: data.response.paymentinfo.zip,
          paypal: data.response.paymentinfo.paypal_account,
          venmo: data.response.paymentinfo.venmo_account
        };
      } else {

      }
    }, error => {
      console.error(error.error);
    });

  }
  getPropertyInfo(): void {
    this.customerPropertyinfoResp = this.cs.getCustomerPropertyinfo();
    this.customerPropertyinfoResp.subscribe(data => {
      if (data.status) {

      } else {

      }
    }, error => {
      console.error(error.error);
    });
  }

  getAccountInfo(): void {
    this.customerAccountinfoResp = this.cs.getCustomerAccountinfo();
    this.customerAccountinfoResp.subscribe(data => {
      if (data.status) {

      } else {

      }
    }, error => {
      console.error(error.error);
    });
  }

}
