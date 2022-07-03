import { createSelector } from '@ngrx/store';
import { EmployeesModuleState } from './employees-module.reducer';

const getEmployeesModuleState = (state: EmployeesModuleState) =>
  state.employeesModule;

export const applications = createSelector(
  getEmployeesModuleState,
  (state) => state.applications
);

export const roles = createSelector(
  getEmployeesModuleState,
  (state) => state.roles
);

export const pagination = createSelector(
  getEmployeesModuleState,
  (state) => state.employees.pagination
);

export const employees = createSelector(
  getEmployeesModuleState,
  ({ employees }) => {
    let start = employees.pagination.pageIndex * employees.pagination.pageSize;
    let end = start + employees.pagination.pageSize;

    return employees.data.slice(start, end);
  }
);

export const employeesLength = createSelector(
  getEmployeesModuleState,
  ({ employees }) => employees.data.length
);

export const getState = createSelector(
  applications,
  roles,
  pagination,
  employees,
  employeesLength,
  (...stateSlices) => {
    return {
      applications: stateSlices[0],
      roles: stateSlices[1],
      employees: {
        data: stateSlices[3],
        pagination: stateSlices[2],
        employeesLength: stateSlices[4],
      },
    };
  }
);
