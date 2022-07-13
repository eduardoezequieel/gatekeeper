import { createSelector } from '@ngrx/store';
import { ApplicationsModuleState } from './applications.reducer';

const getApplicationsModuleState = (state: ApplicationsModuleState) =>
  state.applicationsModule;

export const pagination = createSelector(
  getApplicationsModuleState,
  ({ pagination, applications, searchValue }) => {
    return {
      pagination,
      applicationsLength: applications.length,
      searchValue
    };
  }
);

export const applications = createSelector(
  getApplicationsModuleState,
  ({ applications, pagination }) => {
    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return applications.slice(start, end);
  }
);
