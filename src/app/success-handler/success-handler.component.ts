import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-success-handler',
  templateUrl: './success-handler.component.html',
  styleUrls: ['./success-handler.component.css']
})
export class SuccessHandlerComponent implements OnInit {
  @Input() successString: string;
  constructor() { }

  ngOnInit() {
  }

}
