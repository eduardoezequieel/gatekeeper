import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth-guard.guard';
import { EmployeesGuard } from './shared/guard/employees.guard';
import { LoginGuard } from './shared/guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login/init', pathMatch: 'full' },
  { path: 'login', redirectTo: 'login/init', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./core/modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./core/modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'request',
    loadChildren: () =>
      import('./core/modules/request/request.module').then(
        (m) => m.RequestModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./core/modules/about/about.module').then((m) => m.AboutModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./core/modules/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
    canActivate: [AuthGuard, EmployeesGuard],
  },
  { path: '**', redirectTo: 'login/init' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
