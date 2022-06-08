import { TestBed } from '@angular/core/testing';

import { RequestNotificationService } from './request-notification.service';

describe('RequestNotificationService', () => {
  let service: RequestNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
