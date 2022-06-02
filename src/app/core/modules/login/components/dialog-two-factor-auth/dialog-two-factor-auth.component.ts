import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginErrorsService } from '../../services/login-errors.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dialog-two-factor-auth',
  templateUrl: './dialog-two-factor-auth.component.html',
  styleUrls: ['./dialog-two-factor-auth.component.scss']
})
export class DialogTwoFactorAuthComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogTwoFactorAuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {code: string},
    private router: Router,
    private loginService: LoginService,
    private loginErrors: LoginErrorsService
  ) {}

  sendRequest() {
    this.loginService.authWithRecoveryCode(this.data.code).subscribe(
      resp => {
        console.log('sendResquest', resp);
        this.router.navigate(['/setting'])
      },
      err => {
        console.log(err); 
        this.loginErrors.recoveryCodeErrorOn()
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
