import { createSelector } from '@ngrx/store';
import { SettingsModuleState } from './settings.reducer';

const getSettingsModuleState = (state: SettingsModuleState) =>
  state.settingsModule;

export const webhooks = createSelector(getSettingsModuleState, (state) => {
  let start = state.pagination.pageIndex * state.pagination.pageSize;
  let end = start + state.pagination.pageSize;

  return state.webhooks.slice(start, end);
});

export const pagination = createSelector(getSettingsModuleState, (state) => {
  return {
    pagination: state.pagination,
    webhooksLength: state.webhooks.length,
  };
});
