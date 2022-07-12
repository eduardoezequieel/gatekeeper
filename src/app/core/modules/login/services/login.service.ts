import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from 'src/app/shared/interfaces/loginResponse';
import { RefreshTokenResponse } from 'src/app/shared/interfaces/refreshTokenResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class LoginService {
  private user = new BehaviorSubject({ email: '', password: '' });
  user$ = this.user.asObservable();

  private userRole = new BehaviorSubject('regular');
  userRole$ = this.userRole.asObservable();

  private guardCode = new BehaviorSubject(0);
  guardCode$ = this.guardCode.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.url + '/authentication/login',
      {
        email: email,
        password: password,
      }
    )
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
    return this.http
      .post<RefreshTokenResponse>(
        environment.url + '/authentication/refresh-token',
        {
          refreshToken: token,
        }
      )
      .pipe(
        catchError((err) => {
          console.log('Refresh Token error');
          return throwError(err);
        })
      );
  }

  setUser(email: string, password: string) {
    this.user.next({ email, password });
  }

  setUserRole(role: string) {
    this.userRole.next(role);
  }

  setGuardCode(code: number) {
    this.guardCode.next(code)
  }
  deleteGuardCode(code:number) {
    this.guardCode.next(0)
  }
}
