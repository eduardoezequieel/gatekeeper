import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Employee } from 'src/app/shared/interfaces/loginResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { LoginService } from '../../../login/services/login.service';
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
  user!: Employee;
  admin = false;
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.settingsService.setEnabled(this.user.twoFactorEnabled);
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
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

  openAuthDialog(): void {
    switch (this.disabled) {
      case false:
        this.dialog.open(EnableAuthComponent, {
          width: '846px',
          height: '539px',
        });
        break;
      case true:
        this.dialog.open(DisableAuthComponent, {
          width: '556px',
          height: '320px',
        });
        break;
      default:
        console.log('wut');
    }
  }

  updateToggle(event: any) {
    event.checked = this.disabled;
  }
}
