import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap, switchMap } from 'rxjs';
import { AppEmployeesResponse } from 'src/app/shared/interfaces/appEmployeesResponse';
import {
  Application,
  ApplicationsResponse,
} from 'src/app/shared/interfaces/applicationResponse';
import {
  App,
  AppsOfEmployeeResponse,
} from 'src/app/shared/interfaces/appsOfEmployeeResponse';
import { Employee } from 'src/app/shared/interfaces/employeesResponse';
import {
  AppsRoles,
  RolesOfEmployeeInAppResponse,
} from 'src/app/shared/interfaces/rolesOfEmployeeInApp';
import { Roles, RolesResponse } from 'src/app/shared/interfaces/rolesResponse';
import { environment } from 'src/environments/environment.prod';
import { EmployeesService } from './employees.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private http: HttpClient,
    private employeesService: EmployeesService
  ) {}

  getApplications(items: number): Observable<ApplicationsResponse> {
    return this.http
      .get<ApplicationsResponse>(
        environment.url + `/applications?page=1&items=${items}`
      )
      .pipe(
        switchMap((response) => {
          if (response.data.length < response.pagination.totalItems) {
            return this.getApplications(response.pagination.totalItems);
          } else {
            return of(response);
          }
        })
      );
  }

  getEmployeesOfApp(
    name: string,
    role: string,
    appID: number,
    items: number
  ): Observable<Employee[]> {
    if (appID === -1) {
      return this.employeesService
        .getAllEmployees(1)
        .pipe(
          map((response) =>
            response.filter(
              (employee) =>
                employee.name.toLowerCase().includes(name.toLowerCase()) &&
                employee.role.name.toLowerCase().includes(role.toLowerCase())
            )
          )
        );
    } else {
      return this.http
        .get<AppEmployeesResponse>(
          environment.url +
            `/applications/${appID}/employees?page=1&items=${items}`
        )
        .pipe(
          switchMap((response) => {
            if (items < response.pagination.totalItems) {
              return this.getEmployeesOfApp(
                name,
                role,
                appID,
                response.pagination.totalItems
              );
            } else {
              return of(
                response.data.filter(
                  (employee) =>
                    employee.name
                      .toLowerCase()
                      .includes(name.trim().toLowerCase()) &&
                    employee.role.name
                      .toLowerCase()
                      .includes(role.trim().toLowerCase())
                )
              );
            }
          })
        );
    }
  }

  getAppsOfEmployee(
    id: number,
    page: number,
    items: number
  ): Observable<AppsOfEmployeeResponse> {
    return this.http.get<AppsOfEmployeeResponse>(
      environment.url +
        `/employees/${id}/applications?page=${page}&items=${items}`
    );
  }

  searchAppsOfEmployee(
    id: number,
    search: string,
    items: number
  ): Observable<Application[]> {
    return this.http
      .get<AppsOfEmployeeResponse>(
        environment.url + `/employees/${id}/applications?page=1&items=${items}`
      )
      .pipe(
        switchMap((response) => {
          if (items < response.pagination.totalItems) {
            return this.searchAppsOfEmployee(
              id,
              search,
              response.pagination.totalItems
            );
          } else {
            return of(
              response.data.filter((element) =>
                element.name.toLowerCase().includes(search.toLowerCase())
              )
            );
          }
        })
      );
  }

  getRoles(): Observable<Roles[]> {
    return this.http
      .get<RolesResponse>(environment.url + '/roles')
      .pipe(map((resp) => resp.data));
  }

  getRolesOfApp(appId: number): Observable<Roles[]> {
    return this.http
      .get<RolesResponse>(environment.url + `/applications/${appId}/roles`)
      .pipe(map((resp) => resp.data));
  }

  getRolesOfEmployeeInApp(
    appId: number,
    userId: number
  ): Observable<AppsRoles[]> {
    return this.http
      .get<RolesOfEmployeeInAppResponse>(
        environment.url + `/employees/${userId}/applications/${appId}/roles`
      )
      .pipe(map((resp) => resp.data));
  }

  updateRolesOfEmployeeInApp(
    appId: number,
    userId: number,
    roles: number[]
  ): Observable<AppsRoles[]> {
    let body = {
      roles: roles,
    };
    return this.http
      .patch<RolesOfEmployeeInAppResponse>(
        environment.url + `/employees/${userId}/applications/${appId}/roles`,
        body
      )
      .pipe(map((resp) => resp.data));
  }
}
