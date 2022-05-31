import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWithRCodeComponent } from './components/auth-with-r-code/auth-with-r-code.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { InitComponent } from './components/init/init.component';

import { OneTimeCodeComponent } from './components/one-time-code/one-time-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  // {path:'', redirectTo:'login', pathMatch: 'full'},
  {path: '', component: LoginComponent, 
    children: [
      {path: 'init', component: InitComponent},
      {path: 'one-time-code', component: OneTimeCodeComponent},
      {path: 'password-recovery', component: ForgetPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'auth-with-code', component: AuthWithRCodeComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }