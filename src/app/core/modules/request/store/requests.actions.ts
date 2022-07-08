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

export const updatePagination = createAction(
  '[Requests Module] Update pagination',
  props<{ pageEvent: PageEvent }>()
);

export const searchAppsRequests = createAction(
  '[Requests Module] Search requests',
  props<{ id: number; search: string }>()
);

export const searchAppsRequestsSuccess = createAction(
  '[Requests Module] Gotten filtered requests',
  props<{ response: ApplicationAccess[]; id: number }>()
);
