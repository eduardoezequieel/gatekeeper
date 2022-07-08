import { createSelector } from '@ngrx/store';
import { ApplicationAccess } from 'src/app/shared/interfaces/allRequestsResponse';
import { RequestsModuleState } from './requests.reducer';

const getRequestsModuleState = (state: RequestsModuleState) =>
  state.requestsModule;

export const pagination = createSelector(
  getRequestsModuleState,
  ({ pagination, selectedAppId, totalRequests }) => {
    return {
      pagination,
      selectedAppId,
      totalRequests,
    };
  }
);

export const requests = createSelector(
  getRequestsModuleState,
  ({ request, pagination }) => {
    let start = pagination.pageIndex * pagination.pageSize;
    let end = start + pagination.pageSize;

    return request.slice(start, end);
  }
);

export const filteredRequests = createSelector(
  getRequestsModuleState,
  ({ request, filteredRequestsIds, pagination }) => {
    const filteredRequests: ApplicationAccess[] = [];

    filteredRequestsIds.forEach((id) =>
      filteredRequests.push(request.find((re) => re.id == id)!)
    );

    return filteredRequests;
  }
);

export const filteredRequestsLength = createSelector(
  getRequestsModuleState,
  ({ filteredRequestsIds }) => filteredRequestsIds.length
);
