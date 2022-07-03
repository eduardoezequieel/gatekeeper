import { pagination } from './employees-module.selectors';
import { Employee } from './../../../../shared/interfaces/employeesResponse';
import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import * as applicationsActions from './actions/applications.actions';
import * as rolesActions from './actions/roles.actions';
import * as employeesActions from './actions/employees.actions';
import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { PageEvent } from '@angular/material/paginator';
import { act } from '@ngrx/effects';

export interface EmployeesModuleState extends AppState {
  employeesModule: EmployeesModuleStateForReducer;
}

interface EmployeesModuleStateForReducer {
  applications: Application[];
  roles: Roles[];
  employees: {
    data: Employee[];
    pagination: PageEvent;
  };
}

export const initialState: EmployeesModuleStateForReducer = {
  applications: [],
  roles: [],
  employees: {
    data: [],
    pagination: {
      pageIndex: 0,
      pageSize: 15,
      length: 0,
    },
  },
};

export const employeesModuleReducer = createReducer(
  initialState,
  on(applicationsActions.getApplicationsSuccess, (state, { applications }) => {
    return { ...state, applications };
  }),
  on(rolesActions.getRolesSuccess, (state, { roles }) => {
    return { ...state, roles };
  }),
  on(employeesActions.getEmployeesSuccess, (state, { employees }) => {
    const combinedEmployees: Employee[] = state.employees.data.concat(
      employees.data
    );
    const employeesIds = new Set();
    const filteredEmployees: Employee[] = [];

    combinedEmployees.forEach((employee) => employeesIds.add(employee.id));

    employeesIds.forEach((id) => {
      let index = combinedEmployees.findIndex((employee) => employee.id == id);

      filteredEmployees.push(combinedEmployees[index]);
    });

    return {
      ...state,
      employees: {
        data: filteredEmployees,
        pagination: {
          ...state.employees.pagination,
          length: employees.pagination.totalItems,
          previousPageIndex:
            employees.pagination.previousPage == null
              ? undefined
              : employees.pagination.previousPage,
        },
      },
    };
  }),
  on(employeesActions.updatePagination, (state, { pageEvent }) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        pagination: {
          ...state.employees.pagination,
          pageIndex: pageEvent.pageIndex,
          pageSize: pageEvent.pageSize,
          previousPageIndex: pageEvent.previousPageIndex,
        },
      },
    };
  })
);
