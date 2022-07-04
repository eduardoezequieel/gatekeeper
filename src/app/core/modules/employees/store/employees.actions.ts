import {
  Employee,
  EmployeesResponse,
} from '../../../../shared/interfaces/employeesResponse';
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

export const getEmployee = createAction(
  '[Employees Module] Get employee',
  props<{ id: number }>()
);

export const getEmployeeSuccess = createAction(
  '[Employees Module] Gotten employee',
  props<{ employee: Employee }>()
);

export const getEmployeeFromStore = createAction(
  '[Employees Module] Saved id of the selected employee',
  props<{ id: number }>()
);
