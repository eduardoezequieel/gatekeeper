import { createSelector } from '@ngrx/store';
import { ApplicationAccess } from 'src/app/shared/interfaces/allRequestsResponse';
import { RequestsModuleState } from './requests.reducer';

const getRequestsModuleState = (state: RequestsModuleState) =>
  state.requestsModule;

export const pagination = createSelector(getRequestsModuleState, (state) => {
  return {
    pagination: state.pagination,
    selectedAppId: state.selectedAppId,
    adminRequestsLength: state.adminRequests.length,
    regularRequestsLength: state.regularRequests.length,
  };
});

export const appsRequests = createSelector(
  getRequestsModuleState,
  ({ adminRequests, pagination }) => {
    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return adminRequests.slice(start, end);
  }
);

export const userRequests = createSelector(
  getRequestsModuleState,
  ({ regularRequests, pagination }) => {
    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return regularRequests.slice(start, end);
  }
);

export const filteredAppsRequests = createSelector(
  getRequestsModuleState,
  ({ adminRequests, filteredRequestsIds, pagination }) => {
    const filteredRequests: ApplicationAccess[] = [];

    filteredRequestsIds.forEach((id) =>
      filteredRequests.push(adminRequests.find((re) => re.id == id)!)
    );

    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return filteredRequests.slice(start, end);
  }
);

export const filteredUserRequests = createSelector(
  getRequestsModuleState,
  ({ regularRequests, filteredRequestsIds, pagination }) => {
    const filteredRequests: ApplicationAccess[] = [];

    filteredRequestsIds.forEach((id) =>
      filteredRequests.push(regularRequests.find((re) => re.id == id)!)
    );

    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return filteredRequests.slice(start, end);
  }
);
