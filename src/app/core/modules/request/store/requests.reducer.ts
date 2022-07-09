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
  request: ApplicationAccess[];
  pagination: PageEvent;
  selectedAppId: number;
  totalRequests: number;
  filteredRequestsIds: number[];
}

export const initialState: RequestsModuleStateForReducer = {
  request: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  },
  selectedAppId: -1,
  totalRequests: 0,
  filteredRequestsIds: [],
};

export const requestsModuleReducer = createReducer(
  initialState,
  on(requestActions.getAppsRequestsSuccess, (state, { response, id }) => {
    if (id != state.selectedAppId) {
      return {
        ...state,
        request: response.data,
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          length: response.pagination.totalItems,
        },
        selectedAppId: id,
        totalRequests: response.pagination.totalItems,
      };
    } else {
      if (response.data.length < state.request.length) {
        return {
          ...state,
          request: response.data,
          totalRequests: response.pagination.totalItems,
        };
      } else {
        return {
          ...state,
          request: mergeArrays(state.request, response.data),
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
      request: mergeArrays(state.request, response),
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
        ...state.pagination,
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
  })
);
