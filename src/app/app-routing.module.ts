import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth-guard.guard';

const routes: Routes = [
  {path:'', redirectTo:'login/init', pathMatch: 'full'},
  {path:'login', redirectTo:'login/init', pathMatch: 'full'},
  {path:'login', loadChildren: () => import('./core/modules/login/login.module').then(m => m.LoginModule)},
  {
    path: 'setting',
    loadChildren: () =>
      import('./core/modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard]
  },
  {path:'**', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
