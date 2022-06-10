import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from 'src/app/core/modules/login/services/login.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  isExpanded: boolean = false;
  isOpened: boolean = false;
  login: boolean = false;
  destroyed = new Subject<void>();
  responsive!: boolean;
  path: any;
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
  ]);
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private userService: UserService,
    public loginService: LoginService,
    breakpointObserver: BreakpointObserver
  ) {
    this.matIconRegistry.addSvgIcon(
      `icon_request`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/request.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_iso`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/Isotype.svg'
      )
    );
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            let currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            if (currentScreenSize === 'XSmall') {
              this.responsive = true;
              this.isExpanded = false;
            } else {
              this.responsive = false;
              this.isOpened = false;
            }
          }
        }
      });
  }

  ngOnInit(): void {
    this.loginService.setUserRole(this.userService.getUser()?.role.name);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.path = (<NavigationEnd>event).url;
        this.login = true;
        if (this.path.indexOf('login') !== -1) {
          this.login = false;
        }
        if (!this.userService.getUser()) {
          this.login = false;
        }
      }
    });
  }

  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.isOpened = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
