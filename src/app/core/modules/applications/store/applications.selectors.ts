import { createSelector } from '@ngrx/store';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { ApplicationsModuleState } from './applications.reducer';

const getApplicationsModuleState = (state: ApplicationsModuleState) =>
  state.applicationsModule;

export const pagination = createSelector(
  getApplicationsModuleState,
  ({ pagination, applications, searchValue }) => {
    return {
      pagination,
      applicationsLength: applications.length,
      searchValue,
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

export const filteredApplications = createSelector(
  getApplicationsModuleState,
  ({ applications, filteredApplicationsIds, pagination }) => {
    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;
    const filteredApplications: Application[] = [];

    filteredApplicationsIds
      .slice(start, end)
      .forEach((id) =>
        filteredApplications.push(applications.find((app) => app.id == id)!)
      );

    return filteredApplications;
  }
);

export const filteredApplicationsLength = createSelector(
  getApplicationsModuleState,
  ({ filteredApplicationsIds }) => filteredApplicationsIds.length
);
