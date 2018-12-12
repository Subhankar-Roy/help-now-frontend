import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {
  @Input() errString?: string;
  @Input() errArray?: any;
  constructor() { }

  ngOnInit() {
  }

}
