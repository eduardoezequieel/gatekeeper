import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationsResponse } from 'src/app/shared/interfaces/applicationResponse';

@Injectable()
export class ApplicationsModuleService {
  constructor(private http: HttpClient) {}

  getApplications(
    page: number,
    items: number
  ): Observable<ApplicationsResponse> {
    return this.http.get<ApplicationsResponse>(
      environment.url + `/applications?page=${page}&items=${items}`
    );
  }

  searchApplications(
    page: number,
    items: number,
    search: string
  ): Observable<ApplicationsResponse> {
    return this.http.get<ApplicationsResponse>(
      environment.url +
        `/applications?page=${page}&items=${items}&searchByName=${search}`
    );
  }
}
