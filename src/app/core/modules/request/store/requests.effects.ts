import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import { RequestService } from '../services/request.service';
import * as requestsActions from './requests.actions';
import { RequestsModuleState } from './requests.reducer';
import { pagination } from './requests.selectors';

@Injectable()
export class RequestsEffects {
  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private store: Store<RequestsModuleState>
  ) {}

  getAppsRequests = createEffect(() =>
    this.actions$.pipe(
      ofType(requestsActions.getAppsRequests),
      withLatestFrom(this.store.pipe(select(pagination))),
      mergeMap(([{ id }, { pagination }]) =>
        this.requestService
          .appsAccessRequests(id, pagination.pageIndex + 1, pagination.pageSize)
          .pipe(
            map((response) =>
              requestsActions.getAppsRequestsSuccess({ response, id })
            )
          )
      )
    )
  );

  searchAppsRequests = createEffect(() =>
    this.actions$.pipe(
      ofType(requestsActions.searchAppsRequests),
      mergeMap(({ id, search }) =>
        this.requestService
          .searchAppsAccessRequests(id, search, 1)
          .pipe(
            map((response) =>
              requestsActions.searchAppsRequestsSuccess({ response, id })
            )
          )
      )
    )
  );
}
