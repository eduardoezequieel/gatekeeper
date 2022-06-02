import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SettingsService } from '../../../services/settings.service';
import { ConfirmCloseComponent } from '../confirm-close/confirm-close.component';

@Component({
  selector: 'app-recovery-keys',
  templateUrl: './recovery-keys.component.html',
  styleUrls: ['./recovery-keys.component.scss'],
})
export class RecoveryKeysComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<RecoveryKeysComponent>,
    private dialog: MatDialog,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  continueClick(): void {
    this.dialogRef.close();
    this.dialog.open(ConfirmCloseComponent, {
      width: '556px',
      height: '200px',
      data: this.data,
    });
  }
}
