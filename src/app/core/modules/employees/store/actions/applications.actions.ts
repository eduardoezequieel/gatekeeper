import { createAction, props } from '@ngrx/store';
import { Application } from 'src/app/shared/interfaces/applicationResponse';

export const getApplications = createAction(
  '[Employees Module] Get applications',
  props<{ items: number }>()
);

export const getApplicationsSuccess = createAction(
  '[Employees Module] Gotten applications',
  props<{ applications: Application[] }>()
);

export const getApplicationsError = createAction(
  '[Employees Module] Could not get applications'
);
