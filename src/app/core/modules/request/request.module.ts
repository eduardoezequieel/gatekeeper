import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './components/request/request.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DeleteOneComponent } from './components/dialogs/delete-one/delete-one.component';
import { DeleteAllComponent } from './components/dialogs/delete-all/delete-all.component';
import { AccessRequestComponent } from './components/dialogs/access-request/access-request.component';
import { DenyRequestComponent } from './components/dialogs/deny-request/deny-request.component';
import { AproveRequestComponent } from './components/dialogs/aprove-request/aprove-request.component';
import { MatSelectModule } from '@angular/material/select';
import { AdminRequestComponent } from './components/admin-request/admin-request.component';
import { RegularRequestComponent } from './components/regular-request/regular-request.component';
import { StoreModule } from '@ngrx/store';
import { requestsModuleReducer } from './store/requests.reducer';
import { RequestsEffects } from './store/requests.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    RequestComponent,
    DeleteOneComponent,
    DeleteAllComponent,
    AccessRequestComponent,
    DenyRequestComponent,
    AproveRequestComponent,
    AdminRequestComponent,
    RegularRequestComponent,
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    StoreModule.forFeature('requestsModule', requestsModuleReducer),
    EffectsModule.forFeature([RequestsEffects]),
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class RequestModule {}
