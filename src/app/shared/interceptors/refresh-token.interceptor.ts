import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { LoginService } from 'src/app/core/modules/login/services/login.service';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient, private loginService: LoginService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token = localStorage.getItem('accessToken')
    if(token) {
      let req = this.addToken(request, token)
      
      return next.handle(req)
      .pipe( catchError( (err: HttpErrorResponse) => {
        if(err.status === 401 && !err.error.message[0].includes('2FA')) {
          if(!this.isRefreshing) {
              this.isRefreshing = true;
              return this.loginService.refreshToken(localStorage.getItem('refreshToken')!)
              .pipe(
                switchMap( (res) => {
                  localStorage.setItem('accessToken', res.data.accessToken);
                  return next.handle( this.addToken(request, res.data.accessToken) )
                })
              )
            } else {
              return this.refreshTokenSubject.pipe(
                filter(accessToken => accessToken !== null),
                take(1),
                switchMap( token => {
                  req = this.addToken(request, token);
                  return next.handle(req)})
              )
            }
          } else {
            return next.handle(request)
          }
        }));
    } 
    return next.handle(request)    
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })}
}
