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
}
