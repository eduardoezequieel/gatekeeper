import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of, Subscription, take, tap, throwError } from 'rxjs';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { Employee } from 'src/app/shared/interfaces/employeesResponse';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { ApplicationsService } from './services/applications.service';
import { EmployeesService } from './services/employees.service';
import { WarningsService } from './services/warnings.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  user!: User;
  employees$!: Observable<Employee[]>;
  employeesAmount!: number;
  employeesAmountTotal!: number;
  applications$!: Observable<Application[]>;
  roles$: Observable<Roles[]> = this.applicationService.getRoles();
  actualPage!: PageEvent;

  arrEmployees: Employee[] = []

  filtersOn = false;
  
  subs!: Subscription;
  subs2!: Subscription;
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private employeesService: EmployeesService,
    private applicationService: ApplicationsService,
    public warnings: WarningsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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
      byRol: new FormControl('')
    })
  }
  
  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.applications$ = this.applicationService.getApplications();

    this.subs = this.employeesService.getAllEmployees().subscribe( resp => {
      this.employeesService.employees$ = of(resp);
      this.employeesAmount = resp.length;
      this.onPageChange({pageIndex: 0, pageSize: 15, length: resp.length});
    },
      (error) => {
        this.warnings.mfaWarningOn()
      }
    );
    
    this.subs2 = this.applicationService.getApplications().subscribe (resp => {
      this.applicationService.apps$ = of(resp)
    })
  }

  get name() {
    return (this.form.get('byName')?.value)
  }
  get app() {
    return (this.form.get('byApp')?.value ?? '')
  }
  get rol() {
    return (this.form.get('byRol')?.value ?? '')
  }

  onPageChange($event: PageEvent) {
    this.actualPage = $event;
    if(this.filtersOn) {
      this.employees$ = of(this.arrEmployees.slice(($event.pageIndex) * $event.pageSize, ($event.pageIndex)*$event.pageSize + $event.pageSize))
    } else {
      this.employees$ = this.employeesService.getEmployeesPagination($event.pageIndex + 1, $event.pageSize)
    }
  }

  filter() {
    if(this.app || this.rol || this.name) {
      this.filtersOn = true;
    } else {
      this.filtersOn = false;
    }

    this.applications$.subscribe( resp => {
      
      let appID;
      if(this.app) {
        appID = resp.find( app => app.name == this.app )!.id;
      } else {
        appID = -1;
      }

      this.employees$ = this.applicationService.getEmployeesOfApp(appID).pipe(
        map( emp => emp.filter( e => {
          return e.name.toLowerCase().includes(this.name!.toLowerCase()) && e.role.name.includes(this.rol!.toLowerCase())
        })),
        tap( emp => {
          this.employeesAmount = emp.length;
          this.arrEmployees = emp;
        }),    
        finalize(() => {
          Promise.resolve().then( () =>  this.onPageChange({pageIndex: 0, pageSize: this.actualPage.pageSize, length: this.employeesAmount}))
        })
      )
    })
  }

  resetFilters() {
    this.form.get('byName')?.setValue('')
    this.form.get('byApp')?.setValue('')
    this.form.get('byRol')?.setValue('')
    this.filtersOn = false;
    this.employeesAmount = this.employeesAmountTotal
    this.onPageChange({pageIndex: 0, pageSize: 15, length: this.employeesAmountTotal});
  }

  openUserProfile(name: number) {
    this.router.navigate([`/employees/${name}`])
  }

  closeWarnings() {
    this.warnings.mfaWarningOff();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.subs2.unsubscribe();
  }
}
