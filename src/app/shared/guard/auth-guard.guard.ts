import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { LoginService } from 'src/app/core/modules/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {   
      
    let token = localStorage.getItem('accessToken')

    if(!token) {
      // return this.loginService.user$.pipe(
        return of(false). pipe(
        // map( resp => resp.email !== ''),
        tap(loggedIn => {
          if(!loggedIn) {
            this.router.navigate(['/login/init'])
          }
        })
      );
    } else {
      return of(true)
    }

  }
  
}
