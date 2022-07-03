import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
import { EmployeesModuleState } from './store/employees-module.reducer';
import { WarningsService } from './services/warnings.service';
import * as applicationsActions from './store/actions/applications.actions';
import * as rolesActions from './store/actions/roles.actions';
import * as employeesActions from './store/actions/employees.actions';
import * as selectors from './store/employees-module.selectors';
import { combineLatestWith, mergeWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  user!: User;
  employees!: Employee[];
  applications!: Application[];
  roles!: Roles[];
  pagination!: PageEvent;
  unsubscribe$ = new Subject();
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    public warnings: WarningsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private store: Store<EmployeesModuleState>
  ) {
    this.matIconRegistry.addSvgIcon(
      `icon_user_link`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/user_link.svg'
      )
    );

    this.form = new FormGroup({
      byName: new FormControl(''),
      byApp: new FormControl(''),
      byRol: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(applicationsActions.getApplications({ items: 12 }));
    this.store.dispatch(rolesActions.getRoles());
    this.store.dispatch(employeesActions.getEmployees());

    const applications$ = this.store.select(selectors.applications);
    const roles$ = this.store.select(selectors.roles);
    const employees$ = this.store.select(selectors.employees);
    const pagination$ = this.store.select(selectors.pagination);

    employees$
      .pipe(
        takeUntil(this.unsubscribe$),
        combineLatestWith(applications$, roles$, pagination$)
      )
      .subscribe((response) => {
        this.employees = response[0];
        this.applications = response[1];
        this.roles = response[2];
        this.pagination = response[3];
      });

    this.user = this.userService.getUser();
  }

  get name() {
    return this.form.get('byName')?.value;
  }
  get app() {
    return this.form.get('byApp')?.value ?? '';
  }
  get rol() {
    return this.form.get('byRol')?.value ?? '';
  }

  onPageChange($event: PageEvent) {
    this.store.dispatch(
      employeesActions.updatePagination({ pageEvent: $event })
    );

    if (this.employees.length < this.pagination.length) {
      this.store.dispatch(employeesActions.getEmployees());
    }
  }

  // filter() {
  //   if (this.app || this.rol || this.name) {
  //     this.filtersOn = true;
  //   } else {
  //     this.filtersOn = false;
  //   }

  //   this.applications$.subscribe((resp) => {
  //     let appID;
  //     if (this.app) {
  //       appID = resp.find((app) => app.name == this.app)!.id;
  //     } else {
  //       appID = -1;
  //     }

  //     this.employees$ = this.applicationService.getEmployeesOfApp(appID).pipe(
  //       map((emp) =>
  //         emp.filter((e) => {
  //           return (
  //             e.name.toLowerCase().includes(this.name!.trim().toLowerCase()) &&
  //             e.role.name.includes(this.rol!.toLowerCase())
  //           );
  //         })
  //       ),
  //       tap((emp) => {
  //         this.employeesAmount = emp.length;
  //         this.arrEmployees = emp;
  //       }),
  //       finalize(() => {
  //         Promise.resolve().then(() =>
  //           this.onPageChange({
  //             pageIndex: 0,
  //             pageSize: this.actualPage.pageSize,
  //             length: this.employeesAmount,
  //           })
  //         );
  //       })
  //     );
  //   });
  // }

  // resetFilters() {
  //   this.form.get('byName')?.setValue('');
  //   this.form.get('byApp')?.setValue('');
  //   this.form.get('byRol')?.setValue('');
  //   this.filtersOn = false;
  //   this.employeesAmount = this.employeesAmountTotal;
  //   this.onPageChange({
  //     pageIndex: 0,
  //     pageSize: 15,
  //     length: this.employeesAmountTotal,
  //   });
  // }

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
