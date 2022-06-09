import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoginService } from 'src/app/core/modules/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginChildrenGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.loginService.guardCode$.pipe(map(
      code => {
        if(code > 0 && code%3 == 0) {  // Here we should decodify de code
          return true
        } else {
          this.router.navigate(['/login/init'])
          return false
        }
      }
    ))
  }
  
}
