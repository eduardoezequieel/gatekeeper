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

@NgModule({
  declarations: [ApplicationsComponent, ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
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
})
export class ApplicationsModule {}
