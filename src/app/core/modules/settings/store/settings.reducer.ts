import { pagination } from './../../employees/store/employees.selectors';
import { createReducer, on } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { AppState } from 'src/app/app.reducer';
import { WebHook } from 'src/app/shared/interfaces/webHookResponse';
import * as settingsActions from './settings.actions';
import { mergeArrays } from '../../employees/store/employees.reducer';

export interface SettingsModuleState extends AppState {
  settingsModule: SettingsModuleStateForReducer;
}

interface SettingsModuleStateForReducer {
  webhooks: WebHook[];
  pagination: PageEvent;
}

export const initialState: SettingsModuleStateForReducer = {
  webhooks: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  },
};

export const settingsModuleReducer = createReducer(
  initialState,
  on(settingsActions.getWebHooksSuccess, (state, { response }) => {
    return {
      webhooks: mergeArrays(state.webhooks, response.data),
      pagination: {
        ...state.pagination,
        length: response.pagination.totalItems,
      },
    };
  }),
  on(settingsActions.updatePagination, (state, { pageEvent }) => {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pageIndex: pageEvent.pageIndex,
        pageSize: pageEvent.pageSize,
      },
    };
  })
);
