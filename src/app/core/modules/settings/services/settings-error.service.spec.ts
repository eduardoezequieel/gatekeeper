import { TestBed } from '@angular/core/testing';

import { SettingsErrorService } from './settings-error.service';

describe('SettingsErrorService', () => {
  let service: SettingsErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
