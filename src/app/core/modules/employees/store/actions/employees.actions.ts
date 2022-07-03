import {
  Employee,
  EmployeesResponse,
} from './../../../../../shared/interfaces/employeesResponse';
import { createAction, props } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';

export const getEmployees = createAction('[Employees Module] Get employees');
export const getEmployeesSuccess = createAction(
  '[Employees Module] Gotten employees',
  props<{ employees: EmployeesResponse }>()
);

export const updatePagination = createAction(
  '[Employees Module] Update pagination',
  props<{ pageEvent: PageEvent }>()
);
