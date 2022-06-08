import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginChildrenGuard } from 'src/app/shared/guard/login-children.guard';
import { LoginGuard } from 'src/app/shared/guard/login.guard';
import { AuthWithRCodeComponent } from './components/auth-with-r-code/auth-with-r-code.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { InitComponent } from './components/init/init.component';

import { OneTimeCodeComponent } from './components/one-time-code/one-time-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  // {path:'', redirectTo:'login', pathMatch: 'full'},
  {path: '', component: LoginComponent, 
    children: [
      {path: 'init', component: InitComponent},
      {path: 'one-time-code', component: OneTimeCodeComponent, canActivate: [LoginChildrenGuard]},
      {path: 'password-recovery', component: ForgotPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent, canActivate: [LoginChildrenGuard]},
      {path: 'auth-with-code', component: AuthWithRCodeComponent, canActivate: [LoginChildrenGuard]},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }