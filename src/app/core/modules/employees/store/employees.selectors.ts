import { createSelector } from '@ngrx/store';
import { EmployeesModuleState } from './employees.reducer';
import { Application } from 'src/app/shared/interfaces/applicationResponse';

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

export const employeeApplications = createSelector(
  getEmployeesModuleState,
  ({ employeeDetails }) => {
    let start =
      employeeDetails.applications.pagination.pageIndex *
      employeeDetails.applications.pagination.pageSize;
    let end = start + employeeDetails.applications.pagination.pageSize;

    return employeeDetails.applications.data.slice(start, end);
  }
);

export const employeeDetailsPagination = createSelector(
  getEmployeesModuleState,
  ({ employeeDetails }) => {
    return {
      pagination: employeeDetails.applications.pagination,
      applicationsLength: employeeDetails.applications.data.length,
    };
  }
);

export const filteredAppsLength = createSelector(
  getEmployeesModuleState,
  ({ employeeDetails }) => employeeDetails.filteredApplicationsIds.length
);

export const filteredEmployeeApplications = createSelector(
  getEmployeesModuleState,
  ({ employeeDetails }) => {
    const filteredApplications: Application[] = [];

    employeeDetails.filteredApplicationsIds.forEach((id) => {
      let index = employeeDetails.applications.data.findIndex(
        (app) => app.id == id
      );

      filteredApplications.push(employeeDetails.applications.data[index]);
    });

    let start =
      employeeDetails.applications.pagination.pageIndex *
      employeeDetails.applications.pagination.pageSize;
    let end = start + employeeDetails.applications.pagination.pageSize;

    return filteredApplications.slice(start, end);
  }
);
