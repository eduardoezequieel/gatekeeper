import { createSelector } from '@ngrx/store';
import { EmployeesModuleState } from './employees-module.reducer';

export const getEmployeesModuleState = (state: EmployeesModuleState) =>
  state.employeesModule;

export const applications = createSelector(
  getEmployeesModuleState,
  (state) => state.applications
);

export const roles = createSelector(
  getEmployeesModuleState,
  (state) => state.roles
);
