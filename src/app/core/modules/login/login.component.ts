import { Component, OnInit } from '@angular/core';
import { LoginErrorsService } from './services/login-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public loginErrors: LoginErrorsService) { }

  ngOnInit(): void {
  }

  closeLoginError() {
    this.loginErrors.turnErrorsOff();
  }
}
