import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
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
      mergeMap(() =>
        this.applicationsService.getApplications().pipe(
          map((response) =>
            applicationsActions.getApplicationsSuccess({
              applications: response,
            })
          )
        )
      )
    )
  );
}
