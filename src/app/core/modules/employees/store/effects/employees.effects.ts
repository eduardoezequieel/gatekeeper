import { EmployeesModuleState } from './../employees-module.reducer';
import * as employeesActions from './../actions/employees.actions';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EmployeesService } from '../../services/employees.service';
import { createEffect, ofType } from '@ngrx/effects';
import { mergeMap, withLatestFrom, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { pagination } from '../employees-module.selectors';
@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService,
    private store: Store<EmployeesModuleState>
  ) {}

  getEmployees = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.getEmployees),
      withLatestFrom(this.store.select(pagination)),
      mergeMap(([action, pagination]) =>
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
        this.employeesService
          .getEmployee(id)
          .pipe(
            map((response) =>
              employeesActions.getEmployeeSuccess({ employee: response })
            )
          )
      )
    )
  );
}
