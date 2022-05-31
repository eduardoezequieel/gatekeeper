import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmCloseComponent } from '../confirm-close/confirm-close.component';

@Component({
  selector: 'app-recovery-keys',
  templateUrl: './recovery-keys.component.html',
  styleUrls: ['./recovery-keys.component.scss'],
})
export class RecoveryKeysComponent {
  constructor(
    public dialogRef: MatDialogRef<RecoveryKeysComponent>,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  continueClick(): void {
    this.dialogRef.close();
    this.dialog.open(ConfirmCloseComponent, {
      width: '556px',
      height: '200px',
    });
  }
}
