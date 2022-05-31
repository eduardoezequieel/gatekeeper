import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
