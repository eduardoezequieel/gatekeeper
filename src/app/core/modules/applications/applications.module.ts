import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ApplicationComponent } from './components/application/application.component';
import { ApplicationsModuleService } from './services/applications-module.service';
import { applicationsModuleReducer } from './store/applications.reducer';
import { StoreModule } from '@ngrx/store';
import { ApplicationsEffects } from './store/applications.effects';

@NgModule({
  declarations: [ApplicationsComponent, ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    StoreModule.forFeature('applicationsModule', applicationsModuleReducer),
    EffectsModule.forFeature([ApplicationsEffects]),
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  providers: [ApplicationsModuleService],
})
export class ApplicationsModule {}
