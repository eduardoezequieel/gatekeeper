import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WarningsService {
  mfa = new BehaviorSubject(false);
  mfa$ = this.mfa.asObservable();

  noRoot = new BehaviorSubject(false);
  noRoot$ = this.noRoot.asObservable();

  constructor() {}

  async delay(ms = 4000) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
  }

  mfaWarningOn() {
    this.mfa.next(true);
    this.delay().then(() => {
      this.mfaWarningOff();
    });
  }
  mfaWarningOff() {
    this.mfa.next(false);
  }

  noRootOn() {
    this.noRoot.next(true);
    this.delay().then(() => {
      this.noRootOff();
    });
  }
  noRootOff() {
    this.noRoot.next(false);
  }

  turnWarningsOff() {
    this.noRootOff();
    this.mfaWarningOff();
  }
}
