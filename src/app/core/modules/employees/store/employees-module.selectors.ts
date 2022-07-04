import { createSelector } from '@ngrx/store';
import { EmployeesModuleState } from './employees-module.reducer';

const getEmployeesModuleState = (state: EmployeesModuleState) =>
  state.employeesModule;

export const employees = createSelector(
  getEmployeesModuleState,
  ({ employees }) => {
    let start = employees.pagination.pageIndex * employees.pagination.pageSize;
    let end = start + employees.pagination.pageSize;

    return employees.data.slice(start, end);
  }
);

export const pagination = createSelector(
  getEmployeesModuleState,
  ({ employees }) => {
    return {
      pagination: employees.pagination,
      employeesLength: employees.data.length,
    };
  }
);

export const employeeDetails = createSelector(
  getEmployeesModuleState,
  (state) => {
    let id = state.employeeDetails?.employeeIdDetails;
    return state.employees.data.find((employee) => employee.id == id);
  }
);
