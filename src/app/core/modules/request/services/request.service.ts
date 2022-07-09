import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import {
  AllRequestsResponse,
  ApplicationAccess,
  AssignEmployeeResponse,
} from 'src/app/shared/interfaces/allRequestsResponse';
import {
  Application,
  ApplicationsResponse,
} from 'src/app/shared/interfaces/applicationResponse';
import { RolesResponse } from 'src/app/shared/interfaces/rolesResponse';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  getUserRequests(
    page: number,
    items: number
  ): Observable<AllRequestsResponse> {
    return this.http.get<AllRequestsResponse>(
      environment.url +
        `/employees/me/access-request?page=${page}&items=${items}`
    );
  }
  getOneAplications(): Observable<ApplicationsResponse> {
    return this.http.get<ApplicationsResponse>(
      environment.url + `/applications?page=1&items=1`
    );
  }

  getAllAplications(page: number, item: number): Observable<Application[]> {
    return this.http
      .get<ApplicationsResponse>(
        environment.url + `/applications?page=${page}&items=${item}`
      )
      .pipe(map((response) => response.data));
  }

  requestAccess(
    applicationId: number,
    requestMessage: string
  ): Observable<ApplicationAccess> {
    return this.http.post<ApplicationAccess>(
      environment.url +
        `/applications/${applicationId}/employees/me/access-request`,
      {
        message: requestMessage,
      }
    );
  }

  deleteAccessRequest(accessRequestId: number) {
    return this.http.delete(
      environment.url + `/access-request/${accessRequestId}`
    );
  }

  appsAccessRequests(
    appId: number,
    page: number,
    items: number
  ): Observable<AllRequestsResponse> {
    return this.http.get<AllRequestsResponse>(
      environment.url +
        `/applications/${appId}/access-request?page=${page}&items=${items}`
    );
  }

  searchAppsAccessRequests(
    appId: number,
    search: string,
    items: number
  ): Observable<ApplicationAccess[]> {
    return this.http
      .get<AllRequestsResponse>(
        environment.url +
          `/applications/${appId}/access-request?page=1&items=${items}`
      )
      .pipe(
        switchMap((response) => {
          if (items < response.pagination.totalItems) {
            return this.searchAppsAccessRequests(
              appId,
              search,
              response.pagination.totalItems
            );
          } else {
            return of(
              response.data.filter((element) => {
                return (
                  element.message
                    .toLowerCase()
                    .includes(search.toLowerCase().trim()) ||
                  element.employee.name.toLowerCase().includes(search.toLowerCase().trim()) ||
                  element.application.name.toLowerCase().includes(search.toLowerCase().trim())
                );
              })
            );
          }
        })
      );
  }

  aproveAccessRequest(
    applicationId: number,
    employeeId: number,
    rolesArray: number[]
  ): Observable<AssignEmployeeResponse> {
    return this.http.post<AssignEmployeeResponse>(
      environment.url +
        `/applications/${applicationId}/employees/${employeeId}/assign`,
      { roles: rolesArray }
    );
  }

  getApplicationRoles(applicationId: number): Observable<RolesResponse> {
    return this.http.get<RolesResponse>(
      environment.url + `/applications/${applicationId}/roles`
    );
  }
}
