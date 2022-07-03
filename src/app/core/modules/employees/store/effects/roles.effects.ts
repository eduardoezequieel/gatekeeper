import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApplicationsService } from '../../services/applications.service';
import * as rolesActions from '../actions/roles.actions';

@Injectable()
export class RolesEffects {
  constructor(
    private actions$: Actions,
    private applicationsService: ApplicationsService
  ) {}

  getRoles = createEffect(() =>
    this.actions$.pipe(
      ofType(rolesActions.getRoles),
      mergeMap(() =>
        this.applicationsService.getRoles().pipe(
          map((response) =>
            rolesActions.getRolesSuccess({
              roles: response,
            })
          ),
          catchError(() => {
            throw of(rolesActions.getRolesError());
          })
        )
      )
    )
  );
}
