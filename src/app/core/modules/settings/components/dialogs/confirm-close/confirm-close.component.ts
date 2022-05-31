import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecoveryKeysComponent } from '../recovery-keys/recovery-keys.component';

@Component({
  selector: 'app-confirm-close',
  templateUrl: './confirm-close.component.html',
  styleUrls: ['./confirm-close.component.scss'],
})
export class ConfirmCloseComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmCloseComponent>,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  goBackClick(): void {
    this.dialogRef.close();
    this.dialog.open(RecoveryKeysComponent, {
      width: '846px',
      height: '504px',
    });
  }
}
