import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginErrorsService {

  private loginError = new BehaviorSubject(false)
  loginError$ = this.loginError.asObservable()

  private recoveryCodeError = new BehaviorSubject(false)
  recoveryCodeError$ = this.recoveryCodeError.asObservable()

  private passwordResetSuccess = new BehaviorSubject(false)
  passwordResetSuccess$ = this.passwordResetSuccess.asObservable()

  private oneTimeCodeError = new BehaviorSubject(false)
  oneTimeCodeError$ = this.oneTimeCodeError.asObservable()

  constructor() { }

  LoginErrorOn() {
    this.loginError.next(true)
  }
  LoginErrorOff() {
    this.loginError.next(false)
  }

  recoveryCodeErrorOn() {
    this.recoveryCodeError.next(true)
  }
  recoveryCodeErrorOff() {
    this.recoveryCodeError.next(false)
  }

  turnPasswordResetSuccessOn() {
    this.passwordResetSuccess.next(true)
  }
  turnPasswordResetSuccessOff() {
    this.passwordResetSuccess.next(false)
  }

  oneTimeCodeErrorOn() {
    this.oneTimeCodeError.next(true);
  }
  oneTimeCodeErrorOff() {
    this.oneTimeCodeError.next(false);
  }

  turnErrorsOff() {
    this.passwordResetSuccess.next(false)
    this.recoveryCodeError.next(false)
    this.loginError.next(false)
    this.oneTimeCodeError.next(false)
  }
}
