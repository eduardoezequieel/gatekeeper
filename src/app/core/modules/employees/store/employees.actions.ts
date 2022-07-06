import {
  Employee,
  EmployeesResponse,
} from '../../../../shared/interfaces/employeesResponse';
import { createAction, props } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import {
  Application,
  ApplicationsResponse,
} from 'src/app/shared/interfaces/applicationResponse';
import { AppsOfEmployeeResponse } from 'src/app/shared/interfaces/appsOfEmployeeResponse';

export const getEmployees = createAction('[Employees Module] Get employees');
export const getEmployeesSuccess = createAction(
  '[Employees Module] Gotten employees',
  props<{ employees: EmployeesResponse }>()
);

export const getEmployeesError = createAction(
  '[Employees Module] Could not get employees'
);

export const updatePagination = createAction(
  '[Employees Module] Update pagination',
  props<{ pageEvent: PageEvent }>()
);

export const getEmployee = createAction(
  '[Employees Module] Get employee',
  props<{ id: number }>()
);

export const getEmployeeError = createAction(
  '[Employees Module] Could not get employee'
);

export const getEmployeeSuccess = createAction(
  '[Employees Module] Gotten employee',
  props<{ employee: Employee }>()
);

export const getEmployeeFromStore = createAction(
  '[Employees Module] Saved id of the selected employee',
  props<{ id: number }>()
);

export const getAppsOfEmployee = createAction(
  '[Employees Module] Get applications of employee',
  props<{ id: number }>()
);

export const getAppsOfEmployeeSuccess = createAction(
  '[Employees Module] Gotten applications of employee',
  props<{ applications: AppsOfEmployeeResponse }>()
);

export const updatePaginationEmployeeDetails = createAction(
  '[Employees Module] Update pagination on employee details page',
  props<{ pageEvent: PageEvent }>()
);

export const searchAppsOfEmployee = createAction(
  '[Employees Module] Search apps of employee',
  props<{ id: number; search: string }>()
);

export const searchAppsOfEmployeeSuccess = createAction(
  '[Employees Module] Gotten filtered apps of employee',
  props<{ applications: Application[] }>()
);

export const clearFiltersFromEmployeesDetailsPagination = createAction(
  '[Employees Module] Clear filters from pagination (employees details)'
);

export const getFilteredEmployees = createAction(
  '[Employees Module] Get filtered employees',
  props<{ name: string; applicationId: number; role: string }>()
);

export const getFilteredEmployeesSuccess = createAction(
  '[Employees Module] Gotten filtered employees',
  props<{ employees: Employee[] }>()
);

export const clearFiltersFromEmployeesPagination = createAction(
  '[Employees Module] Clear filters from pagination (employees)'
);
