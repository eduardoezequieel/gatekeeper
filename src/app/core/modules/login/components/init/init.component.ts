import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginErrorsService } from '../../services/login-errors.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
})
export class InitComponent {
  constructor(
    private loginService: LoginService,
    private loginErrors: LoginErrorsService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.loginForm.get('email')!.value;
  }

  get password() {
    return this.loginForm.get('password')!.value;
  }

  onSubmit() {
    this.loginService.login(this.email, this.password).subscribe(
      (resp) => {
        this.loginService.setUser(this.email, this.password);
        if (resp.data.employee.twoFactorEnabled) {
          this.router.navigate(['/login/one-time-code']);
        } else {
          localStorage.setItem('accessToken', resp.data.tokens.accessToken);
          localStorage.setItem('refreshToken', resp.data.tokens.refreshToken);
          localStorage.setItem('user', JSON.stringify(resp.data.employee));
          this.router.navigate(['/setting']);
        }
      },
      (err) => {
        this.loginErrors.LoginErrorOn();
      }
    );
  }
}
