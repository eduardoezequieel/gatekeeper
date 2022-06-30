import { createAction, props } from '@ngrx/store';
import { Application } from 'src/app/shared/interfaces/applicationResponse';

export const getApplications = createAction(
  '[Employees Module] Get applications'
);

export const getApplicationsSuccess = createAction(
  '[Employees Module] Gotten applications',
  props<{ applications: Application[] }>()
);
