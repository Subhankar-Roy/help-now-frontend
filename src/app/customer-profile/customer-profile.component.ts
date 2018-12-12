import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../services/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customerServiceResp: Observable<any>;
  constructor(private cs: CustomerService) { }

  customer: Customer = {
    first_name: "Gargi",
    middle_name: "",
    last_name: "Pal"
  };


  ngOnInit() {

  }

  getPersonalInfo(): void {
    this.customerServiceResp = this.cs.getCustomerPersonalinfo();

  }

}
