import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import {
  Employee,
  EmployeesResponse,
} from 'src/app/shared/interfaces/employeesResponse';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class EmployeesService {
  employees$!: Observable<Employee[]>;

  constructor(private http: HttpClient) {}

  getAllEmployees(items: number): Observable<Employee[]> {
    return this.http
      .get<EmployeesResponse>(
        environment.url + `/employees?page=1&items=${items}`
      )
      .pipe(
        switchMap((response) => {
          if (items < response.pagination.totalItems) {
            return this.getAllEmployees(response.pagination.totalItems);
          } else {
            return of(response.data);
          }
        })
      );
  }

  getEmployees(page: number, items: number): Observable<EmployeesResponse> {
    return this.http.get<EmployeesResponse>(
      environment.url + `/employees?page=${page}&items=${items}`
    );
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this.http
      .get<{ data: Employee }>(environment.url + `/employees/${employeeId}`)
      .pipe(map((resp) => resp.data));
  }

  changeRole(employeeId: number, roleId: number) {
    return this.http.put(environment.url + `/employees/${employeeId}/roles`, {
      roleId: roleId,
    });
  }

  removeMFA(employeeId: number) {
    return this.http.post(
      environment.url + `/two-factor/recover/employees/${employeeId}`,
      {}
    );
  }
}
