import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsErrorService {
  private disableTwoStepSuccess = new BehaviorSubject(false);
  disableTwoStepSuccess$ = this.disableTwoStepSuccess.asObservable();

  private warningCodeError = new BehaviorSubject(false);
  warningCodeError$ = this.warningCodeError.asObservable();

  private enableTwoStepSuccess = new BehaviorSubject(false);
  enableTwoStepSuccess$ = this.enableTwoStepSuccess.asObservable();

  private wrongPassword = new BehaviorSubject(false);
  wrongPassword$ = this.wrongPassword.asObservable();

  private wrongCode = new BehaviorSubject(false);
  wrongCode$ = this.wrongCode.asObservable();

  constructor() {}

  disableTwoStepSuccessOn() {
    this.turnErrorsOff();
    this.disableTwoStepSuccess.next(true);
  }
  disableTwoStepSuccessOff() {
    this.disableTwoStepSuccess.next(false);
  }

  warningCodeErrorOn() {
    this.turnErrorsOff();
    this.warningCodeError.next(true);
  }
  warningCodeErrorOff() {
    this.warningCodeError.next(false);
  }

  enableTwoStepSuccessOn() {
    this.turnErrorsOff();
    this.enableTwoStepSuccess.next(true);
  }
  enableTwoStepSuccessOff() {
    this.enableTwoStepSuccess.next(false);
  }

  wrongPasswordOn() {
    this.turnErrorsOff();
    this.wrongPassword.next(true);
  }
  wrongPasswordOff() {
    this.wrongPassword.next(false);
  }

  wrongCodeOn() {
    this.turnErrorsOff();
    this.wrongCode.next(true);
  }
  wrongCodeOff() {
    this.wrongCode.next(false);
  }

  turnErrorsOff() {
    this.disableTwoStepSuccess.next(false);
    this.warningCodeError.next(false);
    this.enableTwoStepSuccess.next(false);
    this.wrongPassword.next(false);
    this.wrongCode.next(false);
  }
}
