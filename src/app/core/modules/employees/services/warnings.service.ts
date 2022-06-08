import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {

  mfa = new BehaviorSubject(false);
  mfa$ = this.mfa.asObservable();

  constructor() { }

  mfaWarningOn() {
    this.mfa.next(true)
  }
  mfaWarningOff() {
    this.mfa.next(false)
  }
}
