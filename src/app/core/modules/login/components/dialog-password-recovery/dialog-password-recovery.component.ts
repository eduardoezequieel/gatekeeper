import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-password-recovery',
  templateUrl: './dialog-password-recovery.component.html',
  styleUrls: ['./dialog-password-recovery.component.scss']
})
export class DialogPasswordRecoveryComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogPasswordRecoveryComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
