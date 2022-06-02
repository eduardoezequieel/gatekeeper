import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from 'src/app/shared/interfaces/loginResponse';
import { RefreshTokenResponse } from 'src/app/shared/interfaces/refreshTokenResponse';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user = new BehaviorSubject({ email: '', password: '' });
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.url + '/authentication/login',
      {
        email: email,
        password: password,
      }
    );
  }

  loginOneTimeCode(code: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.url + '/authentication/login',
      {
        email: this.user.value.email,
        password: this.user.value.password,
        token: code,
      }
    );
  }

  authWithRecoveryCode(code: string) {
    return this.http.post<LoginResponse>(
      environment.url + '/two-factor/recovery-account',
      {
        email: this.user.value.email,
        password: this.user.value.password,
        recoveryCode: code,
      }
    );
  }

  askPasswordRecovery(email: string) {
    return this.http.post(
      environment.url + '/authentication/request-password-reset',
      {
        email: email,
      }
    );
  }

  resetPassword(password: string, passwordConfirmation: string) {
    return this.http.post(environment.url + '/authentication/password-reset', {
      password: password,
      passwordConfirmation: passwordConfirmation,
    });
  }

  relogin() {
    return this.http.post<LoginResponse>(
      environment.url + '/authentication/login',
      {
        email: this.user.value.email,
        password: this.user.value.password,
      }
    );
  }

  refreshToken(token: string): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(
      environment.url + '/authentication/refresh-token',
      {
        refreshToken: token,
      }
    );
  }

  setUser(email: string, password: string) {
    this.user.next({ email, password });
  }
}
