import { createSelector } from '@ngrx/store';
import { ApplicationAccess } from 'src/app/shared/interfaces/allRequestsResponse';
import { RequestsModuleState } from './requests.reducer';

const getRequestsModuleStateAdmin = (state: RequestsModuleState) =>
  state.requestsModule.admin;

const getRequestsModuleStateRegular = (state: RequestsModuleState) =>
  state.requestsModule.regular;

export const adminPagination = createSelector(
  getRequestsModuleStateAdmin,
  ({ pagination, selectedAppId, request }) => {
    return {
      pagination,
      selectedAppId,
      requestsLength: request.length,
    };
  }
);

export const regularPagination = createSelector(
  getRequestsModuleStateRegular,
  ({ pagination, request }) => {
    return {
      pagination,
      requestsLength: request.length,
    };
  }
);

export const appsRequests = createSelector(
  getRequestsModuleStateAdmin,
  ({ request, pagination }) => {
    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return request.slice(start, end);
  }
);

export const userRequests = createSelector(
  getRequestsModuleStateRegular,
  ({ request, pagination }) => {
    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return request.slice(start, end);
  }
);

export const filteredAppsRequests = createSelector(
  getRequestsModuleStateAdmin,
  ({ request, filteredRequestsIds, pagination }) => {
    const filteredRequests: ApplicationAccess[] = [];

    filteredRequestsIds.forEach((id) =>
      filteredRequests.push(request.find((re) => re.id == id)!)
    );

    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return filteredRequests.slice(start, end);
  }
);

export const filteredAppsRequestsLength = createSelector(
  getRequestsModuleStateAdmin,
  ({ filteredRequestsIds }) => filteredRequestsIds.length
);

export const filteredUserRequestsLength = createSelector(
  getRequestsModuleStateRegular,
  ({ filteredRequestsIds }) => filteredRequestsIds.length
);

export const filteredUserRequests = createSelector(
  getRequestsModuleStateRegular,
  ({ request, filteredRequestsIds, pagination }) => {
    const filteredRequests: ApplicationAccess[] = [];

    filteredRequestsIds.forEach((id) =>
      filteredRequests.push(request.find((re) => re.id == id)!)
    );

    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return filteredRequests.slice(start, end);
  }
);
