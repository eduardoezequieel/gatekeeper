import { createReducer } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { AppState } from 'src/app/app.reducer';
import { WebHook } from 'src/app/shared/interfaces/webHookResponse';

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
    pageSize: 15,
    length: 0,
  },
};

export const settingsModuleReducer = createReducer(initialState);
