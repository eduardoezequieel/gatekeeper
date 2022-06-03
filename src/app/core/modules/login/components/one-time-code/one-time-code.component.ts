import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginErrorsService } from '../../services/login-errors.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-one-time-code',
  templateUrl: './one-time-code.component.html',
  styleUrls: ['./one-time-code.component.scss'],
})
export class OneTimeCodeComponent {
  form!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private loginErrors: LoginErrorsService
  ) {
    this.form = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ]),
    });
  }

  sendCode() {
    this.loginService
      .loginOneTimeCode(this.form.get('code')!.value)
      .subscribe((resp) => {
        localStorage.setItem('accessToken', resp.data.tokens.accessToken);
        localStorage.setItem('refreshToken', resp.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(resp.data.employee));
        this.loginService.setUserRole(resp.data.employee.role.name);
        this.loginErrors.turnErrorsOff();
        this.router.navigate(['/setting']);
      });
  }

  goBack() {
    this.router.navigate(['/login/init']);
  }
}
