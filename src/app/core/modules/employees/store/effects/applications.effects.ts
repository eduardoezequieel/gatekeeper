import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { ApplicationsResponse } from 'src/app/shared/interfaces/applicationResponse';
import { ApplicationsService } from '../../services/applications.service';
import * as applicationsActions from '../actions/applications.actions';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private applicationsService: ApplicationsService
  ) {}

  getApplications = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationsActions.getApplications),
      mergeMap(({ items }) =>
        this.applicationsService.getApplications(items).pipe(
          switchMap((response) => {
            if (response.pagination.totalItems > items) {
              return this.applicationsService.getApplications(
                response.pagination.totalItems
              );
            } else {
              return of(response);
            }
          }),
          map((response) => {
            return applicationsActions.getApplicationsSuccess({
              applications: response.data,
            });
          }),
          catchError(() => {
            throw of(applicationsActions.getApplicationsError());
          })
        )
      )
    )
  );
}
