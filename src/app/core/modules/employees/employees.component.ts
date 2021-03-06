import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { Employee } from 'src/app/shared/interfaces/employeesResponse';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { EmployeesModuleState } from './store/employees.reducer';
import { WarningsService } from './services/warnings.service';
import * as employeesActions from './store/employees.actions';
import * as selectors from './store/employees.selectors';
import {
  Subject,
  takeUntil,
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  take,
  Observable,
} from 'rxjs';
import { ApplicationsService } from './services/applications.service';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  user!: User;
  employees$!: Observable<Employee[]>;
  employeesLength = 0;
  applications!: Application[];
  roles!: Roles[];
  pagination!: PageEvent;
  unsubscribe$ = new Subject();
  form!: FormGroup;
  noResults = false;

  constructor(
    private userService: UserService,
    private applicationsService: ApplicationsService,
    private router: Router,
    public warnings: WarningsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private store: Store<EmployeesModuleState>,
    private fb: FormBuilder,
    private actions$: Actions
  ) {
    this.matIconRegistry.addSvgIcon(
      `icon_user_link`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/user_link.svg'
      )
    );

    this.form = this.fb.group({
      byName: [''],
      byApp: [''],
      byRole: [''],
    });
  }

  ngOnInit(): void {
    this.applicationsService
      .getApplications(12)
      .pipe(combineLatestWith(this.applicationsService.getRoles()))
      .subscribe((response) => {
        this.applications = response[0].data;
        this.roles = response[1];
      });

    this.store.dispatch(employeesActions.getEmployees());

    this.employees$ = this.store.pipe(select(selectors.employees));

    this.store
      .pipe(select(selectors.pagination), takeUntil(this.unsubscribe$))
      .subscribe(({ pagination, employeesLength }) => {
        this.pagination = pagination;
        this.employeesLength = employeesLength;
      });

    this.user = this.userService.getUser();

    this.filters();
    this.getEmployeesError();
  }

  onPageChange($event: PageEvent) {
    this.store.dispatch(
      employeesActions.updatePagination({ pageEvent: $event })
    );

    if (this.employeesLength < this.pagination.length) {
      this.store.dispatch(employeesActions.getEmployees());
    }
  }

  getEmployeesError(): void {
    this.actions$
      .pipe(
        takeUntil(this.unsubscribe$),
        ofType(employeesActions.getEmployeesError)
      )
      .subscribe(() => this.warnings.mfaWarningOn());
  }

  filters(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(700),
        distinctUntilChanged((prev, curr) => {
          return (
            prev.byName == curr.byName &&
            prev.byApp == curr.byApp &&
            prev.byRole == curr.byRole
          );
        })
      )
      .subscribe((response) => {
        if (
          response.byName == '' &&
          response.byApp == '' &&
          response.byRole == ''
        ) {
          this.clearFilters();
        } else {
          let appID = this.applications.find(
            (app) => app.name == response.byApp
          )?.id;

          if (!appID) {
            appID = -1;
          }

          this.store.dispatch(
            employeesActions.getFilteredEmployees({
              name: response.byName,
              applicationId: appID,
              role: response.byRole,
            })
          );

          this.employees$ = this.store.pipe(
            select(selectors.filteredEmployees)
          );

          this.actions$
            .pipe(take(1), ofType(employeesActions.getFilteredEmployeesSuccess))
            .subscribe(() => {
              let length = 0;
              this.employees$
                .pipe(take(1))
                .subscribe((response) => (length = response.length));

              if (length == 0) {
                this.noResults = true;
              } else {
                this.noResults = false;
              }
            });
        }
      });
  }

  clearFilters(): void {
    this.employees$ = this.store.pipe(select(selectors.employees));
    this.form.controls['byName'].setValue('');
    this.form.controls['byApp'].setValue('');
    this.form.controls['byRole'].setValue('');
    this.store.dispatch(employeesActions.clearFiltersFromEmployeesPagination());

    this.noResults = false;
  }

  openUserProfile(name: number) {
    this.router.navigate([`/employees/${name}`]);
  }

  closeWarnings() {
    this.warnings.mfaWarningOff();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.warnings.turnWarningsOff();
  }
}
