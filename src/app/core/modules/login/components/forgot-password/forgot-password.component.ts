import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { DialogPasswordRecoveryComponent } from '../dialog-password-recovery/dialog-password-recovery.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  formPasswordRecovery = new FormGroup({
    email: new FormControl('', Validators.required)
  })

  constructor(
    private dialog: MatDialog, 
    private router: Router,
    private loginService: LoginService) { }

  get email() {
    return this.formPasswordRecovery.get('email')!.value
  }

  onSubmit() {
    this.loginService.askPasswordRecovery(this.email).subscribe(
      () => this.openDialog()
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPasswordRecoveryComponent, { });
  }

  goBack() {
    this.router.navigate(['login'])
  }

}
