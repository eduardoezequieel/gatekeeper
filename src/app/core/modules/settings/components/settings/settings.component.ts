import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePassComponent } from '../dialogs/change-pass/change-pass.component';
import { DisableAuthComponent } from '../dialogs/disable-auth/disable-auth.component';
import { EnableAuthComponent } from '../dialogs/enable-auth/enable-auth.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  disabled = false;
  admin = true;
  constructor(public dialog: MatDialog) {}
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
}
