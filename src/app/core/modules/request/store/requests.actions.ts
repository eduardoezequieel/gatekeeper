import { PageEvent } from '@angular/material/paginator';
import { createAction, props } from '@ngrx/store';

import {
  AllRequestsResponse,
  ApplicationAccess,
} from 'src/app/shared/interfaces/allRequestsResponse';

export const getAppsRequests = createAction(
  '[Requests Module] Get requests',
  props<{ id: number }>()
);

export const getAppsRequestsSuccess = createAction(
  '[Requests Module] Gotten requests',
  props<{ response: AllRequestsResponse; id: number }>()
);

export const getUserRequests = createAction(
  '[Requests Module] Get requests from user'
);

export const getUserRequestsSuccess = createAction(
  '[Requests Module] Gotten requests from user',
  props<{ response: AllRequestsResponse }>()
);

export const updatePaginationAdmin = createAction(
  '[Requests Module] Update pagination (admin)',
  props<{ pageEvent: PageEvent }>()
);

export const updatePaginationRegular = createAction(
  '[Requests Module] Update pagination (regular)',
  props<{ pageEvent: PageEvent }>()
);

export const searchAppsRequests = createAction(
  '[Requests Module] Search apps requests',
  props<{ id: number; search: string }>()
);

export const searchUserRequests = createAction(
  '[Requests Module] Search user requests',
  props<{ search: string }>()
);

export const searchAppsRequestsSuccess = createAction(
  '[Requests Module] Gotten filtered apps requests',
  props<{ response: ApplicationAccess[]; id: number }>()
);

export const searchUserRequestsSuccess = createAction(
  '[Requests Module] Gotten filtered user requests',
  props<{ response: ApplicationAccess[] }>()
);

export const clearFiltersFromRequestsAdmin = createAction(
  '[Requests Module] Clear filters from requests pagination (admin)'
);

export const clearFiltersFromRequestsRegular = createAction(
  '[Requests Module] Clear filters from requests pagination (regular)'
);
