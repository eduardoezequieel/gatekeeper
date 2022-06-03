import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  constructor() {}

  disableTwoStepSuccessOn() {
    this.disableTwoStepSuccess.next(true);
  }
  disableTwoStepSuccessOff() {
    this.disableTwoStepSuccess.next(false);
  }

  warningCodeErrorOn() {
    this.warningCodeError.next(true);
  }
  warningCodeErrorOff() {
    this.warningCodeError.next(false);
  }

  enableTwoStepSuccessOn() {
    this.enableTwoStepSuccess.next(true);
  }
  enableTwoStepSuccessOff() {
    this.enableTwoStepSuccess.next(false);
  }

  turnErrorsOff() {
    this.disableTwoStepSuccess.next(false);
    this.warningCodeError.next(false);
    this.enableTwoStepSuccess.next(false);
  }
}
