import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessHandlerComponent } from './success-handler.component';

describe('SuccessHandlerComponent', () => {
  let component: SuccessHandlerComponent;
  let fixture: ComponentFixture<SuccessHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
