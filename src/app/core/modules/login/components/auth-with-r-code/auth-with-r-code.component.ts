import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { DialogTwoFactorAuthComponent } from '../dialog-two-factor-auth/dialog-two-factor-auth.component';

@Component({
  selector: 'app-auth-with-r-code',
  templateUrl: './auth-with-r-code.component.html',
  styleUrls: ['./auth-with-r-code.component.scss']
})

export class AuthWithRCodeComponent {

  form!: FormGroup

  constructor(private router: Router, private loginService: LoginService, private dialog: MatDialog) {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required])
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogTwoFactorAuthComponent, {
      data: {code: this.form.get('code')!.value}
    });
  }
   
  goBack() {
    this.router.navigate(['/login/init'])
  }
}
