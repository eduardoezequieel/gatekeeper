import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Employee, EmployeesResponse } from 'src/app/shared/interfaces/employeesResponse';
import { environment } from 'src/environments/environment.prod';
import { WarningsService } from './warnings.service';

@Injectable()
export class EmployeesService {

  employees$!: Observable<Employee[]>

  constructor(private http: HttpClient, private warnings: WarningsService) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<EmployeesResponse>(environment.url + '/employees?page=1&items=100').pipe(
      map(resp => resp.data),
    )
  }

  getEmployee(employeeId: string): Observable<Employee> {
    return this.http.get<{data: Employee}>(environment.url + `/employees/${employeeId}`).pipe(
      map(resp => resp.data)
    )
  }

  changeRole(employeeId: number, roleId: number) {
    return this.http.put(environment.url + `/employees/${employeeId}/roles`, {
      "roleId": roleId
    })
  }

  removeMFA(employeeId: number) {
    return this.http.post(environment.url + `/two-factor/recover/employees/${employeeId}`, {})
  }

  getEmployeesPagination(page: number, items: number): Observable<Employee[]> {
    return this.http.get<EmployeesResponse>(environment.url + `/employees?page=${page}&items=${items}`).pipe(
      map(resp => resp.data)
    )
  }
}
