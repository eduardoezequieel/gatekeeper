import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginErrorsService } from '../../services/login-errors.service';
import { LoginService } from '../../services/login.service';
import { CustomValidators } from '../../validators/passwordMatch';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  formResetPassword!: FormGroup;
  
  constructor(
    private loginService: LoginService, 
    private loginErrors: LoginErrorsService, 
    private router: Router ) {
    this.formResetPassword = new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(8), CustomValidators.passwordValidation]),
        passwordConfirmation: new FormControl('', Validators.required),
      }, 
        {validators: CustomValidators.mustMatch('password', 'passwordConfirmation')}
    )    
   }

  get password() {
    return this.formResetPassword.get('password')!
  }

  get passwordConfirmation() {
    return this.formResetPassword.get('passwordConfirmation')!.value
  }

  onSubmit() {
    this.loginService.resetPassword(this.password.value, this.passwordConfirmation).subscribe(
      () => this.loginErrors.turnPasswordResetSuccessOn()
    )
    this.router.navigate(['/login/init'])
  }
}
