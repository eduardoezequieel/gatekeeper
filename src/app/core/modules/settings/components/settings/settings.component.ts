import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { SettingsErrorService } from '../../services/settings-error.service';
import { SettingsService } from '../../services/settings.service';
import { ChangePassComponent } from '../dialogs/change-pass/change-pass.component';
import { DisableAuthComponent } from '../dialogs/disable-auth/disable-auth.component';
import { EnableAuthComponent } from '../dialogs/enable-auth/enable-auth.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  disabled = false;
  user!: User;
  admin = false;
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private settingsService: SettingsService,
    private router: Router,
    public settingMessages: SettingsErrorService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `icon_user_link`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logos/user_link.svg'
      )
    );
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.settingsService.setEnabled(this.user.twoFactorEnabled);
    this.settingsService.enabled$.subscribe((res) => {
      this.disabled = res;
    });
    if (this.user.role.id === 2) {
      this.admin = true;
    }
  }

  openPassDialog(): void {
    this.dialog.open(ChangePassComponent, {
      width: '556px',
      height: '480px',
    });
  }

  openWebHooks() {
    if (!this.disabled) {
      this.settingMessages.warningCodeErrorOn();
      return;
    }
    this.router.navigate(['/setting/webhooks']);
  }

  openAuthDialog(): void {
    switch (this.disabled) {
      case false:
        this.dialog.open(EnableAuthComponent, {
          width: '846px',
        });
        break;
      case true:
        this.dialog.open(DisableAuthComponent, {
          width: '556px',
        });
        break;
      default:
        console.log('wut');
    }
  }

  updateToggle(event: any) {
    event.checked = this.disabled;
  }
  closeSettingsError() {
    this.settingMessages.turnErrorsOff();
  }
}
