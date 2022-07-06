import { EmployeesModuleState } from './employees.reducer';
import * as employeesActions from './employees.actions';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EmployeesService } from '../services/employees.service';
import { createEffect, ofType } from '@ngrx/effects';
import { mergeMap, withLatestFrom, map, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  pagination,
  employeeDetailsPagination,
} from './employees.selectors';
import { ApplicationsService } from '../services/applications.service';
@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService,
    private applicationsService: ApplicationsService,
    private store: Store<EmployeesModuleState>
  ) {}

  getEmployees = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.getEmployees),
      withLatestFrom(this.store.select(pagination)),
      mergeMap(([action, { pagination }]) =>
        this.employeesService
          .getEmployees(pagination.pageIndex + 1, pagination.pageSize)
          .pipe(
            map((response) =>
              employeesActions.getEmployeesSuccess({ employees: response })
            )
          )
      )
    )
  );

  getEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.getEmployee),
      mergeMap(({ id }) =>
        this.employeesService.getEmployee(id).pipe(
          map((response) =>
            employeesActions.getEmployeeSuccess({ employee: response })
          ),
          catchError(() => {
            return of(employeesActions.getEmployeeError());
          })
        )
      )
    )
  );

  getAppsOfEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.getAppsOfEmployee),
      withLatestFrom(this.store.select(employeeDetailsPagination)),
      mergeMap(([{ id }, { pagination }]) =>
        this.applicationsService
          .getAppsOfEmployee(id, pagination.pageIndex + 1, pagination.pageSize)
          .pipe(
            map((response) =>
              employeesActions.getAppsOfEmployeeSuccess({
                applications: response,
              })
            )
          )
      )
    )
  );

  searchAppsOfEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.searchAppsOfEmployee),
      mergeMap(({id, search}) =>
        this.applicationsService
          .searchAppsOfEmployee(id, search, 1)
          .pipe(
            map((response) =>
              employeesActions.searchAppsOfEmployeeSuccess({
                applications: response,
              })
            )
          )
      )
    )
  );
}
