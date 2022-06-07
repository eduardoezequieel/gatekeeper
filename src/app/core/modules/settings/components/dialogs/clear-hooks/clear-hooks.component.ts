import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-clear-hooks',
  templateUrl: './clear-hooks.component.html',
  styleUrls: ['./clear-hooks.component.scss'],
})
export class ClearHooksComponent {
  constructor(
    public dialogRef: MatDialogRef<ClearHooksComponent>,
    private settingsService: SettingsService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  clearAllLogs() {
    this.settingsService.clearLogs();
    this.dialogRef.close();
  }
}
