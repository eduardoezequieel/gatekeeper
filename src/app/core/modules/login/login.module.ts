import { LoginService } from 'src/app/core/modules/login/services/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

import { InitComponent } from './components/init/init.component';
import { OneTimeCodeComponent } from './components/one-time-code/one-time-code.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthWithRCodeComponent } from './components/auth-with-r-code/auth-with-r-code.component';
import { LoginComponent } from './login.component';
import { DialogPasswordRecoveryComponent } from './components/dialog-password-recovery/dialog-password-recovery.component';
import { LoginErrorsService } from './services/login-errors.service';
import { DialogTwoFactorAuthComponent } from './components/dialog-two-factor-auth/dialog-two-factor-auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    InitComponent,
    OneTimeCodeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AuthWithRCodeComponent,
    DialogPasswordRecoveryComponent,
    DialogTwoFactorAuthComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatDialogModule,
  ],
  providers: [LoginErrorsService],
})
export class LoginModule {}
