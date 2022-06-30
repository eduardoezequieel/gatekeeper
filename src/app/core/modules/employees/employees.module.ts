import { EffectsEmployeesModuleArray } from './store/effects/index';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesRoutingModule } from './employees-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EmployeesComponent } from './employees.component';
import { ChangeRolesComponent } from './components/user-profile/dialogs/change-roles/change-roles.component';
import { ShortNamesPipe } from 'src/app/shared/short-names.pipe';
import { ViewRolesComponent } from './components/user-profile/dialogs/view-roles/view-roles.component';
import { RemoveMfaComponent } from './components/user-profile/dialogs/remove-mfa/remove-mfa.component';
import { employeesModuleReducer } from './store/employees-module.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    EmployeesComponent,
    UserProfileComponent,
    ShortNamesPipe,
    ChangeRolesComponent,
    ViewRolesComponent,
    RemoveMfaComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('employeesModule', employeesModuleReducer),
    EffectsModule.forFeature(EffectsEmployeesModuleArray),
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
})
export class EmployeesModule {}
