import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-password-recovery',
  templateUrl: './dialog-password-recovery.component.html',
  styleUrls: ['./dialog-password-recovery.component.scss']
})
export class DialogPasswordRecoveryComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogPasswordRecoveryComponent>,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/login/reset-password'])
  }

}
