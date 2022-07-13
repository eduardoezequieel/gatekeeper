import * as requestActions from './requests.actions';
import { PageEvent } from '@angular/material/paginator';
import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { mergeArrays } from '../../employees/store/employees.reducer';
import { ApplicationAccess } from 'src/app/shared/interfaces/allRequestsResponse';

export interface RequestsModuleState extends AppState {
  requestsModule: RequestsModuleStateForReducer;
}

interface RequestsModuleStateForReducer {
  adminRequests: ApplicationAccess[];
  regularRequests: ApplicationAccess[];
  pagination: PageEvent;
  selectedAppId: number;
  totalRequests: number;
  filteredRequestsIds: number[];
}

export const initialState: RequestsModuleStateForReducer = {
  adminRequests: [],
  regularRequests: [],
  pagination: {
    pageIndex: 0,
    length: 0,
    pageSize: 10,
  },
  selectedAppId: 0,
  totalRequests: 0,
  filteredRequestsIds: [],
};

export const requestsModuleReducer = createReducer(
  initialState,
  on(requestActions.getAppsRequestsSuccess, (state, { response, id }) => {
    if (id != state.selectedAppId) {
      return {
        ...state,
        adminRequests: response.data,
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          length: response.pagination.totalItems,
        },
        selectedAppId: id,
        totalRequests: response.pagination.totalItems,
      };
    } else {
      if (response.data.length < state.adminRequests.length) {
        return {
          ...state,
          adminRequests: response.data,
          totalRequests: response.pagination.totalItems,
        };
      } else {
        return {
          ...state,
          adminRequests: mergeArrays(state.adminRequests, response.data),
          totalRequests: response.pagination.totalItems,
        };
      }
    }
  }),
  on(requestActions.searchAppsRequestsSuccess, (state, { response }) => {
    const ids: number[] = [];
    response.forEach((element) => ids.push(element.id));

    return {
      ...state,
      adminRequests: mergeArrays(state.adminRequests, response),
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        length: ids.length,
      },
      filteredRequestsIds: ids,
    };
  }),
  on(requestActions.clearFiltersFromRequests, (state) => {
    return {
      ...state,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        length: state.totalRequests,
      },
    };
  }),
  on(requestActions.updatePagination, (state, { pageEvent }) => {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pageIndex: pageEvent.pageIndex,
        pageSize: pageEvent.pageSize,
      },
    };
  }),
  on(requestActions.getUserRequestsSuccess, (state, { response }) => {
    return {
      ...state,
      regularRequests: mergeArrays(state.regularRequests, response.data),
      pagination: {
        ...state.pagination,
        length: response.pagination.totalItems,
      },
      totalRequests: response.pagination.totalItems,
    };
  }),
  on(requestActions.searchUserRequestsSuccess, (state, { response }) => {
    const ids: number[] = [];
    response.forEach((element) => ids.push(element.id));

    return {
      ...state,
      regularRequests: mergeArrays(state.regularRequests, response),
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        length: ids.length,
      },
      filteredRequestsIds: ids,
    };
  }),
  on(requestActions.restartPagination, (state) => {
    return {
      ...state,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        length: 0,
      },
    };
  })
);
