import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import { mergeMap } from 'rxjs';
import * as settingsActions from './settings.actions';
import { SettingsModuleState } from './settings.reducer';
import { pagination } from './settings.selectors';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private store: Store<SettingsModuleState>
  ) {}

  getWebHooks = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsActions.getWebHooks),
      withLatestFrom(this.store.pipe(select(pagination))),
      mergeMap(([action, { pagination }]) =>
        this.settingsService
          .getWebHooks(pagination.pageIndex + 1, pagination.pageSize)
          .pipe(
            map((response) => settingsActions.getWebHooksSuccess({ response }))
          )
      )
    )
  );
}
