import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
      this.router.navigate(['/login/init']);
      return false
    } else {
      return true;
    }

    // if(!!this.loginService.user$) {
    //   console.log('aqui')
    //   this.router.navigate(['/login/init'])
    //   return true
    // } else {
    //   return false
    // }
  }  
}
