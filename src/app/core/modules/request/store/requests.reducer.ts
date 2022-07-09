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
        totalRequests: response.data.length,
      };
    } else {
      if (response.data.length < state.request.length) {
        return {
          ...state,
          request: response.data,
          totalRequests: response.data.length,
        };
      } else {
        return {
          ...state,
          request: mergeArrays(state.request, response.data),
          totalRequests: state.request.length + response.data.length,
        };
      }
    }
  }),
  on(requestActions.searchAppsRequestsSuccess, (state, { response }) => {
    if (response.length > 0) {
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
    } else {
      return state;
    }
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
