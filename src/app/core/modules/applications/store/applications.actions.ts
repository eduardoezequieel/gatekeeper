import { PageEvent } from '@angular/material/paginator';
import { createAction, props } from '@ngrx/store';
import { ApplicationsResponse } from 'src/app/shared/interfaces/applicationResponse';

export const getApplications = createAction(
  '[Applications Module] Get applications'
);

export const getApplicationsSuccess = createAction(
  '[Applications Module] Gotten applications',
  props<{ response: ApplicationsResponse }>()
);

export const updatePagination = createAction(
  '[Applications Module] Update pagination',
  props<{ pageEvent: PageEvent }>()
);

export const searchApplications = createAction(
  '[Applications Module] Search applications',
  props<{ search: string }>()
);

export const searchApplicationsSuccess = createAction(
  '[Applications Module] Gotten filtered applications',
  props<{ response: ApplicationsResponse; search: string }>()
);

export const getFilteredApplications = createAction(
  '[Applications Module] Get filtered applications from next page'
);

export const getFilteredApplicationsSuccess = createAction(
  '[Applications Module] Gotten filtered applications from next page',
  props<{ response: ApplicationsResponse }>()
);

export const clearFilters = createAction(
  '[Applications Module] Clear filters from applications pagination'
);
