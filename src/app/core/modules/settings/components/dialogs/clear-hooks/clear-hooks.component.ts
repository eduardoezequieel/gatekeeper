import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { SettingsErrorService } from '../../../services/settings-error.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-clear-hooks',
  templateUrl: './clear-hooks.component.html',
  styleUrls: ['./clear-hooks.component.scss'],
})
export class ClearHooksComponent {
  constructor(
    public dialogRef: MatDialogRef<ClearHooksComponent>,
    private settingsService: SettingsService,
    private settingMessages: SettingsErrorService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  clearAllLogs() {
    this.settingsService
      .clearLogs()
      .pipe(take(1))
      .subscribe(() => {
        this.settingMessages.logsClearedOn();
      });
    this.dialogRef.close();
  }
}
