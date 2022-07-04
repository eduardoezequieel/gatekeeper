import { Employee } from './../../../../shared/interfaces/employeesResponse';
import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import * as applicationsActions from './actions/applications.actions';
import * as rolesActions from './actions/roles.actions';
import * as employeesActions from './actions/employees.actions';
import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { PageEvent } from '@angular/material/paginator';

export interface EmployeesModuleState extends AppState {
  employeesModule: EmployeesModuleStateForReducer;
}

interface EmployeesModuleStateForReducer {
  applications: Application[];
  roles: Roles[];
  employees: {
    data: Employee[];
    pagination: PageEvent;
    employeeIdDetails?: number;
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

export const mergeEmployees = (
  oldState: Employee[],
  employeesToBeMerged: Employee[]
) => {
  const mergedEmployees: Employee[] = oldState.concat(employeesToBeMerged);
  const employeesIds = new Set();
  const filteredEmployees: Employee[] = [];

  mergedEmployees.forEach((employee) => employeesIds.add(employee.id));

  employeesIds.forEach((id) => {
    let index = mergedEmployees.findIndex((employee) => employee.id == id);
    filteredEmployees.push(mergedEmployees[index]);
  });

  return filteredEmployees;
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
    return {
      ...state,
      employees: {
        ...state.employees,
        data: mergeEmployees(state.employees.data, employees.data),
        pagination: {
          ...state.employees.pagination,
          length: employees.pagination.totalItems,
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
  }),
  on(employeesActions.getEmployeeFromStore, (state, { id }) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        employeeIdDetails: id,
      },
    };
  }),
  on(employeesActions.getEmployeeSuccess, (state, { employee }) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        data: [...state.employees.data].concat([employee]),
      },
    };
  })
);
