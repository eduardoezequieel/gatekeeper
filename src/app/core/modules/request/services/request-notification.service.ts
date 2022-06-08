import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
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

  constructor() {}

  requestAddedSuccessfullyOn() {
    this.turnErrorsOff();
    this.requestAddedSuccessfully.next(true);
  }
  requestAddedSuccessfullyOff() {
    this.requestAddedSuccessfully.next(false);
  }

  requestDeletedSuccessfullyOn() {
    this.turnErrorsOff();
    this.requestDeletedSuccessfully.next(true);
  }
  requestDeletedSuccessfullyOff() {
    this.requestDeletedSuccessfully.next(false);
  }

  noRolesAvailableOn() {
    this.turnErrorsOff();
    this.noRolesAvailable.next(true);
  }
  noRolesAvailableOff() {
    this.noRolesAvailable.next(false);
  }

  selectRoleOn() {
    this.turnErrorsOff();
    this.selectRole.next(true);
  }
  selectRoleOff() {
    this.selectRole.next(false);
  }

  requestAprovedOn() {
    this.turnErrorsOff();
    this.requestAproved.next(true);
  }
  requestAprovedOff() {
    this.requestAproved.next(false);
  }

  requestDeniedOn() {
    this.turnErrorsOff();
    this.requestDenied.next(true);
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
  }
}
