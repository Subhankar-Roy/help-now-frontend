import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorhandleComponent } from './errorhandle.component';

describe('ErrorhandleComponent', () => {
  let component: ErrorhandleComponent;
  let fixture: ComponentFixture<ErrorhandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorhandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorhandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
