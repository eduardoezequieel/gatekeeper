import * as employeesActions from '../../store/employees.actions';
import { EmployeesModuleState } from './../../store/employees-module.reducer';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  combineLatestWith,
  Observable,
  Subject,
  takeUntil,
  Subscription,
} from 'rxjs';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { Employee } from 'src/app/shared/interfaces/employeesResponse';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { WarningsService } from '../../services/warnings.service';
import { ChangeRolesComponent } from './dialogs/change-roles/change-roles.component';
import {
  employeeApplications,
  employeeDetails,
  employeeDetailsPagination,
  filteredAppsLength,
  filteredEmployeeApplications,
} from '../../store/employees-module.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { ApplicationsService } from '../../services/applications.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  disabled = false;
  user!: User;
  employee?: Employee;
  apps$!: Observable<Application[]>;
  appsLength = 0;
  pagination!: PageEvent;
  searchInput = this.fb.control('');
  filtersOn = false;

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  private unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private applicationsService: ApplicationsService,
    public warningService: WarningsService,
    private activatedRoute: ActivatedRoute,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private store: Store<EmployeesModuleState>,
    private actions$: Actions,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.matIconRegistry.addSvgIcon(
      `icon_user_link`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/user_link.svg'
      )
    );
  }

  ngOnInit(): void {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.store.dispatch(employeesActions.getEmployeeFromStore({ id }));
    this.store.dispatch(employeesActions.getAppsOfEmployee({ id }));
    this.user = this.userService.getUser();

    this.store
      .pipe(select(employeeDetails), takeUntil(this.unsubscribe$))
      .subscribe((response) => (this.employee = response));

    if (!this.employee) {
      this.store.dispatch(employeesActions.getEmployee({ id }));
    }

    this.getApps();
    this.getEmployeeError();

    this.searchInput.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: string) => {
        if (this.searchInput.dirty && response.length == 0) {
          this.clearFilters();
        }
      });
  }

  getApps(): void {
    this.apps$ = this.store.pipe(select(employeeApplications));

    this.store
      .pipe(select(employeeDetailsPagination), takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.pagination = response.pagination;
        this.appsLength = response.applicationsLength;
      });
  }

  getEmployeeError(): void {
    this.actions$
      .pipe(
        takeUntil(this.unsubscribe$),
        ofType(employeesActions.getEmployeeError)
      )
      .subscribe(() => this.route.navigateByUrl('/employees'));
  }

  onPageChange($event: PageEvent) {
    this.store.dispatch(
      employeesActions.updatePaginationEmployeeDetails({ pageEvent: $event })
    );

    if (this.appsLength < this.pagination.length) {
      this.store.dispatch(
        employeesActions.getAppsOfEmployee({ id: this.employee?.id! })
      );
    }
  }

  search(): void {
    if ((this.searchInput.value as string).length != 0) {
      this.filtersOn = true;

      this.store.dispatch(
        employeesActions.searchAppsOfEmployee({
          id: this.employee?.id!,
          search: this.searchInput.value,
        })
      );

      this.store
        .pipe(select(filteredAppsLength), takeUntil(this.unsubscribe$))
        .subscribe((response) => {
          if (response != 0) {
            this.apps$ = this.store.pipe(select(filteredEmployeeApplications));
          }
        });
    }
  }

  clearFilters(): void {
    this.apps$ = this.store.pipe(select(employeeApplications));

    this.searchInput.reset('');

    this.store.dispatch(
      employeesActions.clearFiltersFromEmployeesDetailsPagination()
    );
  }

  // getApps($event: PageEvent) {
  //   let id = this.activatedRoute.snapshot.paramMap.get('id')!;
  //   this.subs = this.employeeService
  //     .getEmployee(parseInt(id))
  //     .subscribe((empl) => {
  //       this.employee = empl;
  //       this.apps$ = this.appService.getAppsOfEmployee(empl.id).pipe(
  //         switchMap((apps) => {
  //           this.lenght = apps.length;
  //           if (this.lenght) {
  //             return this.appService.getAppsOfEmployee(empl.id, 0, this.lenght);
  //           }
  //           return [];
  //         })
  //       );
  //     });
  // }

  changeRoles(): void {
    this.dialog.open(ChangeRolesComponent, {
      width: '556px',
      data: {
        userName: this.user.name,
        userRole: this.user.role.name,
        userId: this.user.id,
      },
    });
  }

  // viewRoles(appId: number) {
  //   const DialogRef = this.dialog.open(ViewRolesComponent, {
  //     width: '556px',
  //     data: { user: this.employee.name, app: appId, userId: this.employee.id },
  //   });
  //   DialogRef.afterClosed().subscribe((resp) => {
  //     if (resp.data == 0)
  //       this.getApps({
  //         pageIndex: 0,
  //         pageSize: this.pageSize,
  //         length: this.lenght,
  //       });
  //   });
  // }

  // filterApps(filterName: string) {
  //   this.apps$ = this.appService
  //     .getAppsOfEmployee(this.employee.id)
  //     .pipe(
  //       map((emps) =>
  //         emps.filter((emp) =>
  //           emp.name.toLowerCase().includes(filterName.trim().toLowerCase())
  //         )
  //       )
  //     );
  // }

  // removeMFA() {
  //   this.dialog.open(RemoveMfaComponent, {
  //     width: '556px',
  //     data: { employeeId: this.employee.id },
  //   });
  // }

  removeNoRootWarning() {
    this.warningService.noRootOff();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.warningService;
  }
}
