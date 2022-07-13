import {
  clearFilters,
  getApplicationsSuccess,
  getFilteredApplicationsSuccess,
  searchApplicationsSuccess,
  updatePagination,
} from './applications.actions';
import { PageEvent } from '@angular/material/paginator';
import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { mergeArrays } from '../../employees/store/employees.reducer';

export interface ApplicationsModuleState extends AppState {
  applicationsModule: ApplicationsModuleStateForReducer;
}

interface ApplicationsModuleStateForReducer {
  applications: Application[];
  pagination: PageEvent;
  totalApplications: number;
  filteredApplicationsIds: number[];
  searchValue?: string;
}

export const initialState: ApplicationsModuleStateForReducer = {
  applications: [],
  pagination: {
    pageIndex: 0,
    pageSize: 12,
    length: 0,
  },
  totalApplications: 0,
  filteredApplicationsIds: [],
};

export const applicationsModuleReducer = createReducer(
  initialState,
  on(getApplicationsSuccess, (state, { response }) => {
    return {
      ...state,
      applications: mergeArrays(state.applications, response.data),
      pagination: {
        ...state.pagination,
        length: response.pagination.totalItems,
      },
      totalApplications: response.pagination.totalItems,
    };
  }),
  on(updatePagination, (state, { pageEvent }) => {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pageIndex: pageEvent.pageIndex,
        pageSize: pageEvent.pageSize,
      },
    };
  }),
  on(searchApplicationsSuccess, (state, { response, search }) => {
    const ids: number[] = [];
    response.data.forEach((element) => ids.push(element.id));

    return {
      ...state,
      applications: mergeArrays(state.applications, response.data),
      pagination: {
        pageIndex: 0,
        length: response.pagination.totalItems,
        pageSize: 12,
      },
      filteredApplicationsIds: ids,
      searchValue: search,
    };
  }),
  on(getFilteredApplicationsSuccess, (state, { response }) => {
    const ids = new Set();

    state.filteredApplicationsIds.forEach((id) => ids.add(id));
    response.data.forEach((element) => ids.add(element.id));

    return {
      ...state,
      applications: mergeArrays(state.applications, response.data),
      pagination: {
        ...state.pagination,
        length: response.pagination.totalItems,
      },
      filteredApplicationsIds: Array.from(ids) as number[],
    };
  }),
  on(clearFilters, (state) => {
    return {
      ...state,
      pagination: {
        pageIndex: 0,
        pageSize: 12,
        length: state.totalApplications,
      },
      filteredApplicationsIds: [],
    };
  })
);
