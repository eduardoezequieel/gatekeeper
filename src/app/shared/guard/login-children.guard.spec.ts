import { TestBed } from '@angular/core/testing';

import { LoginChildrenGuard } from './login-children.guard';

describe('LoginChildrenGuard', () => {
  let guard: LoginChildrenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginChildrenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
