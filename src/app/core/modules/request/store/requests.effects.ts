import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class RequestsEffects {
  constructor(private actions$: Actions) {}
}
