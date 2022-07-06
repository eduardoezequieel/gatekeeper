import { PageEvent } from '@angular/material/paginator';
import { createAction, props } from '@ngrx/store';
import { WebHookResponse } from 'src/app/shared/interfaces/webHookResponse';

export const getWebHooks = createAction(
  '[Settings Module] Get webhooks',
);

export const getWebHooksSuccess = createAction(
  '[Settings Module] Gotten webhooks',
  props<{ response: WebHookResponse }>()
);

export const updatePagination = createAction(
  '[Settings Module] Update pagination',
  props<{ pageEvent: PageEvent }>()
);
