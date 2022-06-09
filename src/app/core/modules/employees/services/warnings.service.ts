import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {

  mfa = new BehaviorSubject(false);
  mfa$ = this.mfa.asObservable();

  noRoot = new BehaviorSubject(false);
  noRoot$ = this.noRoot.asObservable();

  constructor() { }

  mfaWarningOn() {
    this.mfa.next(true)
  }
  mfaWarningOff() {
    this.mfa.next(false)
  }

  noRootOn() {
    this.noRoot.next(true)
  }
  noRootOff() {
    this.noRoot.next(false)
  }

  turnWarningsOff() {
    this.noRootOff();
    this.mfaWarningOff();
  }
}
