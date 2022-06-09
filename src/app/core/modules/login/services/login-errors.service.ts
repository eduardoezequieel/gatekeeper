import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginErrorsService {
  private loginError = new BehaviorSubject(false);
  loginError$ = this.loginError.asObservable();

  private recoveryCodeError = new BehaviorSubject(false);
  recoveryCodeError$ = this.recoveryCodeError.asObservable();

  private passwordResetSuccess = new BehaviorSubject(false);
  passwordResetSuccess$ = this.passwordResetSuccess.asObservable();

  private oneTimeCodeError = new BehaviorSubject(false);
  oneTimeCodeError$ = this.oneTimeCodeError.asObservable();

  constructor() {}

  async delay(ms = 4000) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
  }

  LoginErrorOn() {
    this.loginError.next(true);
    this.delay().then(() => {
      this.LoginErrorOff();
    });
  }
  LoginErrorOff() {
    this.loginError.next(false);
  }

  recoveryCodeErrorOn() {
    this.recoveryCodeError.next(true);
    this.delay().then(() => {
      this.recoveryCodeErrorOff();
    });
  }
  recoveryCodeErrorOff() {
    this.recoveryCodeError.next(false);
  }

  turnPasswordResetSuccessOn() {
    this.passwordResetSuccess.next(true);
    this.delay().then(() => {
      this.turnPasswordResetSuccessOff();
    });
  }
  turnPasswordResetSuccessOff() {
    this.passwordResetSuccess.next(false);
  }

  oneTimeCodeErrorOn() {
    this.oneTimeCodeError.next(true);
    this.delay().then(() => {
      this.oneTimeCodeErrorOff();
    });
  }
  oneTimeCodeErrorOff() {
    this.oneTimeCodeError.next(false);
  }

  turnErrorsOff() {
    this.passwordResetSuccess.next(false);
    this.recoveryCodeError.next(false);
    this.loginError.next(false);
    this.oneTimeCodeError.next(false);
  }
}
