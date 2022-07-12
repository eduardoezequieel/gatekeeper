import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable()
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

  private passwordChanged = new BehaviorSubject(false);
  passwordChanged$ = this.passwordChanged.asObservable();

  private logsCleared = new BehaviorSubject(false);
  logsCleared$ = this.logsCleared.asObservable();

  private noLogs = new BehaviorSubject(false);
  noLogs$ = this.noLogs.asObservable();

  constructor() {}

  async delay(ms = 4000) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
  }

  noLogsOn() {
    this.noLogs.next(true);
    this.delay().then(() => {
      this.noLogsOff();
    });
  }
  noLogsOff() {
    this.noLogs.next(false);
  }

  logsClearedOn() {
    this.logsCleared.next(true);
    this.delay().then(() => {
      this.logsClearedOff();
    });
  }
  logsClearedOff() {
    this.logsCleared.next(false);
  }

  disableTwoStepSuccessOn() {
    this.disableTwoStepSuccess.next(true);
    this.delay().then(() => {
      this.disableTwoStepSuccessOff();
    });
  }
  disableTwoStepSuccessOff() {
    this.disableTwoStepSuccess.next(false);
  }

  passwordChangedOn() {
    this.passwordChanged.next(true);
    this.delay().then(() => {
      this.passwordChangedOff();
    });
  }
  passwordChangedOff() {
    this.passwordChanged.next(false);
  }

  warningCodeErrorOn() {
    this.warningCodeError.next(true);
    this.delay().then(() => {
      this.warningCodeErrorOff();
    });
  }
  warningCodeErrorOff() {
    this.warningCodeError.next(false);
  }

  enableTwoStepSuccessOn() {
    this.enableTwoStepSuccess.next(true);
    this.delay().then(() => {
      this.enableTwoStepSuccessOff();
    });
  }
  enableTwoStepSuccessOff() {
    this.enableTwoStepSuccess.next(false);
  }

  wrongPasswordOn() {
    this.wrongPassword.next(true);
    this.delay().then(() => {
      this.wrongPasswordOff();
    });
  }
  wrongPasswordOff() {
    this.wrongPassword.next(false);
  }

  wrongCodeOn() {
    this.wrongCode.next(true);
    this.delay().then(() => {
      this.wrongCodeOff();
    });
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
    this.passwordChanged.next(false);
    this.logsCleared.next(false);
    this.noLogs.next(false);
  }
}
