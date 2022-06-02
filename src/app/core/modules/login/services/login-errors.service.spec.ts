import { TestBed } from '@angular/core/testing';

import { LoginErrorsService } from './login-errors.service';

describe('LoginErrorsService', () => {
  let service: LoginErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
