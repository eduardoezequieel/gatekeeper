import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AllRequestsResponse,
  ApplicationAccess,
  AssignEmployeeResponse,
} from 'src/app/shared/interfaces/allRequestsResponse';
import {
  ApplicationResponse,
  ApplicationRoles,
} from 'src/app/shared/interfaces/applicationResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
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
  getAllAplications(
    page: number,
    item: number
  ): Observable<ApplicationResponse> {
    return this.http.get<ApplicationResponse>(
      environment.url + `/applications?page=${page}&items=${item}`
    );
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

  getApplicationRoles(applicationId: number): Observable<ApplicationRoles> {
    return this.http.get<ApplicationRoles>(
      environment.url + `/applications/${applicationId}/roles`
    );
  }
}
