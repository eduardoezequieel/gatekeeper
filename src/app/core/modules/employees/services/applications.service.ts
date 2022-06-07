import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AppEmployeesResponse } from 'src/app/shared/interfaces/appEmployeesResponse';
import { Application, ApplicationsResponse } from 'src/app/shared/interfaces/applicationResponse';
import { App, AppsOfEmployeeResponse } from 'src/app/shared/interfaces/appsOfEmployeeResponse';
import { Employee } from 'src/app/shared/interfaces/employeesResponse';
import { AppsRoles, RolesOfEmployeeInAppResponse } from 'src/app/shared/interfaces/rolesOfEmployeeInApp';
import { Roles, RolesResponse } from 'src/app/shared/interfaces/rolesResponse';
import { environment } from 'src/environments/environment.prod';
import { EmployeesService } from './employees.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  apps$!: Observable<Application[]> ;

  constructor(private http: HttpClient, private employeesService: EmployeesService) { }

  getApplications(): Observable<Application[]> {
    return this.http.get<ApplicationsResponse>(environment.url + '/applications?page=1&items=100').pipe(
      map( resp => resp.data)
      )
    }
    
  getEmployeesOfApp(appID: number): Observable<Employee[]> {
    if(appID === -1) {
      return this.employeesService.getAllEmployees();
    }
    return this.http.get<AppEmployeesResponse>(environment.url + `/applications/${appID}/employees?page=1&items=100`).pipe(
      map(resp => { return resp.data })
    )
  }

  getAppsOfEmployee(employeeId: number): Observable<App[]> {
    return this.http.get<AppsOfEmployeeResponse>(environment.url + `/employees/${employeeId}/applications?page=1&items=100`).pipe(
      map(resp => { return resp.data })
    )
  }

  getRoles(): Observable<Roles[]> {
    return this.http.get<RolesResponse>(environment.url + '/roles').pipe(
      map( resp => resp.data )
    )
  }

  getRolesOfApp(appId: number):Observable<Roles[]> {
    return this.http.get<RolesResponse>(environment.url + `/applications/${appId}/roles`).pipe(
      map( resp => resp.data )
    )
  }

  getRolesOfEmployeeInApp(appId: number, userId: number):Observable<AppsRoles[]> {
    return this.http.get<RolesOfEmployeeInAppResponse>(environment.url + `/employees/${userId}/applications/${appId}/roles`).pipe(
      map( resp => resp.data )
    )
  }

  updateRolesOfEmployeeInApp(appId: number, userId: number, roles: number[]):Observable<AppsRoles[]> {
    let body = {
      "roles": roles
    }
    return this.http.patch<RolesOfEmployeeInAppResponse>(environment.url + `/employees/${userId}/applications/${appId}/roles`, body).pipe(
      map( resp => resp.data ),
    )
  }
}