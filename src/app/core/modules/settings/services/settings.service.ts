import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Activate2FaResponse } from 'src/app/shared/interfaces/activate2faResponse';
import { Generate2FA } from 'src/app/shared/interfaces/generate2-fa';
import { UpdatePass } from 'src/app/shared/interfaces/loginResponse';
import { WebHookResponse } from 'src/app/shared/interfaces/webHookResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private enabled = new BehaviorSubject<boolean>(
    this.userService.getUser().twoFactorEnabled
  );
  enabled$ = this.enabled.asObservable();
  constructor(private http: HttpClient, private userService: UserService) {}

  generateTwoStep(): Observable<Generate2FA> {
    return this.http.post<Generate2FA>(
      environment.url + '/two-factor/generate',
      {}
    );
  }

  activateTwoStep(code: string): Observable<Activate2FaResponse> {
    return this.http.post<Activate2FaResponse>(
      environment.url + '/two-factor/activate',
      {
        token: code,
      }
    );
  }

  deactivateTwoStep(code: string) {
    return this.http.post(environment.url + '/two-factor/deactivate', {
      token: code,
    });
  }

  setEnabled(state: boolean) {
    this.enabled.next(state);
  }

  getWebHooks(): Observable<WebHookResponse> {
    return this.http.get<WebHookResponse>(
      environment.url + '/webhooks/logs?page=1&items=10'
    );
  }
  changePassword(
    current: string,
    newPass: string,
    confirmPass: string
  ): Observable<UpdatePass> {
    return this.http.patch<UpdatePass>(
      environment.url + '/employees/me/change-password',
      {
        oldPassword: current,
        newPassword: newPass,
        confirmPassword: confirmPass,
      }
    );
  }
}
