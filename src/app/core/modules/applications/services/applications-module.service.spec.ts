import { TestBed } from '@angular/core/testing';

import { ApplicationsModuleService } from './applications-module.service';

describe('ApplicationsService', () => {
  let service: ApplicationsModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
