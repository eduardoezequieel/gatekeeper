import * as employeesActions from './../../store/actions/employees.actions';
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
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  map,
  Observable,
  Subscription,
  switchMap,
  Subject,
  takeUntil,
} from 'rxjs';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { Employee } from 'src/app/shared/interfaces/employeesResponse';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { ApplicationsService } from '../../services/applications.service';
import { EmployeesService } from '../../services/employees.service';
import { WarningsService } from '../../services/warnings.service';
import { ChangeRolesComponent } from './dialogs/change-roles/change-roles.component';
import { RemoveMfaComponent } from './dialogs/remove-mfa/remove-mfa.component';
import { ViewRolesComponent } from './dialogs/view-roles/view-roles.component';
import { employeeDetails } from '../../store/employees-module.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  disabled = false;
  user!: User;
  employee?: Employee;
  admin = false;
  apps$!: Observable<Application[]>;
  subs!: Subscription;

  pageSize = 10;
  pageIndex = 0;
  lenght = 100;

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  private unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private appService: ApplicationsService,
    public warningService: WarningsService,
    private employeeService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private store: Store<EmployeesModuleState>
  ) {
    this.matIconRegistry.addSvgIcon(
      `icon_user_link`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/user_link.svg'
      )
    );
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (this.user.role.id === 2) {
      this.admin = true;
    }

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.store.dispatch(employeesActions.getEmployeeFromStore({ id }));

    this.store
      .pipe(select(employeeDetails), takeUntil(this.unsubscribe$))
      .subscribe((employee) => (this.employee = employee));

    if (!this.employee) {
      this.store.dispatch(employeesActions.getEmployee({ id }));
    }
  }

  getApps($event: PageEvent) {
    let id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.subs = this.employeeService
      .getEmployee(parseInt(id))
      .subscribe((empl) => {
        this.employee = empl;
        this.apps$ = this.appService.getAppsOfEmployee(empl.id).pipe(
          switchMap((apps) => {
            this.lenght = apps.length;
            if (this.lenght) {
              return this.appService.getAppsOfEmployee(empl.id, 0, this.lenght);
            }
            return [];
          })
        );
      });
  }

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
