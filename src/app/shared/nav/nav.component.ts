import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isExpanded: boolean = false;
  login: boolean = true;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `icon_user`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/user.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_app`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/app.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_settings`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/settings.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_right`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/right.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_about`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/about.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_request`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/request.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_left`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/left.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_iso`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/Isotype.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `icon_logout`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/logout.svg'
      )
    );
  }
}
