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
  admin: {
    request: ApplicationAccess[];
    pagination: PageEvent;
    selectedAppId: number;
    totalRequests: number;
    filteredRequestsIds: number[];
  };
  regular: {
    request: ApplicationAccess[];
    pagination: PageEvent;
    totalRequests: number;
    filteredRequestsIds: number[];
  };
}

export const initialState: RequestsModuleStateForReducer = {
  admin: {
    request: [],
    pagination: {
      pageIndex: 0,
      pageSize: 10,
      length: 0,
    },
    selectedAppId: -1,
    totalRequests: 0,
    filteredRequestsIds: [],
  },
  regular: {
    request: [],
    pagination: {
      pageIndex: 0,
      pageSize: 10,
      length: 0,
    },
    totalRequests: 0,
    filteredRequestsIds: [],
  },
};

export const requestsModuleReducer = createReducer(
  initialState,
  on(requestActions.getAppsRequestsSuccess, (state, { response, id }) => {
    if (id != state.admin.selectedAppId) {
      return {
        ...state,
        admin: {
          ...state.admin,
          request: response.data,
          pagination: {
            pageIndex: 0,
            pageSize: 10,
            length: response.pagination.totalItems,
          },
          selectedAppId: id,
          totalRequests: response.pagination.totalItems,
        },
      };
    } else {
      if (response.data.length < state.admin.request.length) {
        return {
          ...state,
          admin: {
            ...state.admin,
            request: response.data,
            totalRequests: response.pagination.totalItems,
          },
        };
      } else {
        return {
          ...state,
          admin: {
            ...state.admin,
            request: mergeArrays(state.admin.request, response.data),
            totalRequests: response.pagination.totalItems,
          },
        };
      }
    }
  }),
  on(requestActions.searchAppsRequestsSuccess, (state, { response }) => {
    const ids: number[] = [];
    response.forEach((element) => ids.push(element.id));

    return {
      ...state,
      admin: {
        ...state.admin,
        request: mergeArrays(state.admin.request, response),
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          length: ids.length,
        },
        filteredRequestsIds: ids,
      },
    };
  }),
  on(requestActions.clearFiltersFromRequestsAdmin, (state) => {
    return {
      ...state,
      admin: {
        ...state.admin,
        pagination: {
          ...state.admin.pagination,
          pageIndex: 0,
          pageSize: 10,
          length: state.admin.totalRequests,
        },
      },
    };
  }),
  on(requestActions.updatePaginationAdmin, (state, { pageEvent }) => {
    return {
      ...state,
      admin: {
        ...state.admin,
        pagination: {
          ...state.admin.pagination,
          pageIndex: pageEvent.pageIndex,
          pageSize: pageEvent.pageSize,
        },
      },
    };
  }),
  on(requestActions.getUserRequestsSuccess, (state, { response }) => {
    return {
      ...state,
      regular: {
        ...state.regular,
        request: mergeArrays(state.regular.request, response.data),
        pagination: {
          ...state.regular.pagination,
          length: response.pagination.totalItems,
        },
        totalRequests: response.pagination.totalItems,
      },
    };
  }),
  on(requestActions.updatePaginationRegular, (state, { pageEvent }) => {
    return {
      ...state,
      regular: {
        ...state.regular,
        pagination: {
          ...state.regular.pagination,
          pageIndex: pageEvent.pageIndex,
          pageSize: pageEvent.pageSize,
        },
      },
    };
  }),
  on(requestActions.searchUserRequestsSuccess, (state, { response }) => {
    const ids: number[] = [];
    response.forEach((element) => ids.push(element.id));

    return {
      ...state,
      regular: {
        ...state.regular,
        request: mergeArrays(state.regular.request, response),
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          length: ids.length,
        },
        filteredRequestsIds: ids,
      },
    };
  }),
  on(requestActions.clearFiltersFromRequestsRegular, (state) => {
    return {
      ...state,
      regular: {
        ...state.regular,
        pagination: {
          ...state.regular.pagination,
          pageIndex: 0,
          pageSize: 10,
          length: state.regular.totalRequests,
        },
      },
    };
  }),
);
