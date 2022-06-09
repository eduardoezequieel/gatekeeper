import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../nav/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let user = this.userService.getUser();
    if(user.role.name == 'regular') {
      this.router.navigate(['/setting'])
      return false
    } else {
      return true;
    }
  }
  
}
