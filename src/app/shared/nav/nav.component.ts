import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isExpanded: boolean = false;
  login: boolean = false;
  loggedIn = new BehaviorSubject<boolean>(false);
  path: any;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
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
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.path = (<NavigationEnd>event).url;
        this.login = true;
        if (this.path.indexOf('login') !== -1) {
          this.login = false;
        }
      }
    });
  }
}
