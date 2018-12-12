import { TestBed } from '@angular/core/testing';

import { ErrorBagServiceService } from './error-bag-service.service';

describe('ErrorBagServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorBagServiceService = TestBed.get(ErrorBagServiceService);
    expect(service).toBeTruthy();
  });
});
