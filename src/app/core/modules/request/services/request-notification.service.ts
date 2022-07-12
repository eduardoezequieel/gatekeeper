import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RequestNotificationService {
  private requestAddedSuccessfully = new BehaviorSubject(false);
  requestAddedSuccessfully$ = this.requestAddedSuccessfully.asObservable();

  private requestDeletedSuccessfully = new BehaviorSubject(false);
  requestDeletedSuccessfully$ = this.requestDeletedSuccessfully.asObservable();

  private selectRole = new BehaviorSubject(false);
  selectRole$ = this.selectRole.asObservable();

  private noRolesAvailable = new BehaviorSubject(false);
  noRolesAvailable$ = this.noRolesAvailable.asObservable();

  private requestAproved = new BehaviorSubject(false);
  requestAproved$ = this.requestAproved.asObservable();

  private requestDenied = new BehaviorSubject(false);
  requestDenied$ = this.requestDenied.asObservable();

  private enableTwoStep = new BehaviorSubject(false);
  enableTwoStep$ = this.enableTwoStep.asObservable();

  private alreadyHaveAccess = new BehaviorSubject(false);
  alreadyHaveAccess$ = this.alreadyHaveAccess.asObservable();

  constructor() {}

  async delay(ms = 4000) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
  }

  alreadyHaveAccessOn() {
    this.alreadyHaveAccess.next(true);
    this.delay().then(() => {
      this.alreadyHaveAccessOff();
    });
  }
  alreadyHaveAccessOff() {
    this.alreadyHaveAccess.next(false);
  }

  enableTwoStepOn() {
    this.enableTwoStep.next(true);
    this.delay().then(() => {
      this.enableTwoStepOff();
    });
  }
  enableTwoStepOff() {
    this.enableTwoStep.next(false);
  }

  requestAddedSuccessfullyOn() {
    this.requestAddedSuccessfully.next(true);
    this.delay().then(() => {
      this.requestAddedSuccessfullyOff();
    });
  }
  requestAddedSuccessfullyOff() {
    this.requestAddedSuccessfully.next(false);
  }

  requestDeletedSuccessfullyOn() {
    this.requestDeletedSuccessfully.next(true);
    this.delay().then(() => {
      this.requestDeletedSuccessfullyOff();
    });
  }
  requestDeletedSuccessfullyOff() {
    this.requestDeletedSuccessfully.next(false);
  }

  noRolesAvailableOn() {
    this.noRolesAvailable.next(true);
    this.delay().then(() => {
      this.noRolesAvailableOff();
    });
  }
  noRolesAvailableOff() {
    this.noRolesAvailable.next(false);
  }

  selectRoleOn() {
    this.selectRole.next(true);
    this.delay().then(() => {
      this.selectRoleOff();
    });
  }
  selectRoleOff() {
    this.selectRole.next(false);
  }

  requestAprovedOn() {
    this.requestAproved.next(true);
    this.delay().then(() => {
      this.requestAprovedOff();
    });
  }
  requestAprovedOff() {
    this.requestAproved.next(false);
  }

  requestDeniedOn() {
    this.requestDenied.next(true);
    this.delay().then(() => {
      this.requestDeniedOff();
    });
  }

  requestDeniedOff() {
    this.requestDenied.next(false);
  }

  turnErrorsOff() {
    this.requestAproved.next(false);
    this.selectRole.next(false);
    this.noRolesAvailable.next(false);
    this.requestAddedSuccessfully.next(false);
    this.requestDeletedSuccessfully.next(false);
    this.requestDenied.next(false);
    this.enableTwoStep.next(false);
    this.alreadyHaveAccess.next(false);
  }
}
