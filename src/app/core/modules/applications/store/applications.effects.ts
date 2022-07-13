import { ApplicationsModuleState } from './applications.reducer';
import { ApplicationsModuleService } from './../services/applications-module.service';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as applicationsActions from './applications.actions';
import { select, Store } from '@ngrx/store';
import { pagination } from './applications.selectors';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private applicationsService: ApplicationsModuleService,
    private store: Store<ApplicationsModuleState>
  ) {}

  getApplications = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationsActions.getApplications),
      withLatestFrom(this.store.select(pagination)),
      mergeMap(([action, { pagination }]) =>
        this.applicationsService
          .getApplications(pagination.pageIndex + 1, pagination.pageSize)
          .pipe(
            map((response) =>
              applicationsActions.getApplicationsSuccess({ response })
            )
          )
      )
    )
  );

  searchApplications = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationsActions.searchApplications),
      withLatestFrom(this.store.select(pagination)),
      mergeMap(([{ search }, { pagination }]) =>
        this.applicationsService
          .searchApplications(1, pagination.pageSize, search)
          .pipe(
            map((response) =>
              applicationsActions.searchApplicationsSuccess({
                response,
                search,
              })
            )
          )
      )
    )
  );

  filteredApplications = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationsActions.getFilteredApplications),
      withLatestFrom(this.store.select(pagination)),
      mergeMap(([action, { pagination, searchValue }]) =>
        this.applicationsService
          .searchApplications(
            pagination.pageIndex + 1,
            pagination.pageSize,
            searchValue!
          )
          .pipe(
            map((response) =>
              applicationsActions.getFilteredApplicationsSuccess({ response })
            )
          )
      )
    )
  );
}
