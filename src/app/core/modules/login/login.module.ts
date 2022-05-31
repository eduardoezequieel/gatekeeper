import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog'; 
import { InitComponent } from './components/init/init.component';
import { OneTimeCodeComponent } from './components/one-time-code/one-time-code.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthWithRCodeComponent } from './components/auth-with-r-code/auth-with-r-code.component'; 
import { LoginComponent } from './login.component';
import { DialogPasswordRecoveryComponent } from './components/dialog-password-recovery/dialog-password-recovery.component';


@NgModule({
  declarations: [
    LoginComponent, 
    InitComponent, 
    OneTimeCodeComponent, 
    ForgetPasswordComponent, 
    ResetPasswordComponent, 
    AuthWithRCodeComponent, DialogPasswordRecoveryComponent
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
    MatDialogModule
  ]
})
export class LoginModule { }
