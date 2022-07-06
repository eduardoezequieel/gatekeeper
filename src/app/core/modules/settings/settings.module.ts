import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { WebhooksComponent } from './components/webhooks/webhooks.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetailsComponent } from './components/dialogs/details/details.component';
import { ClearHooksComponent } from './components/dialogs/clear-hooks/clear-hooks.component';
import { ChangePassComponent } from './components/dialogs/change-pass/change-pass.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DisableAuthComponent } from './components/dialogs/disable-auth/disable-auth.component';
import { EnableAuthComponent } from './components/dialogs/enable-auth/enable-auth.component';
import { ConfirmCloseComponent } from './components/dialogs/confirm-close/confirm-close.component';
import { RecoveryKeysComponent } from './components/dialogs/recovery-keys/recovery-keys.component';
import { settingsModuleReducer } from './store/settings.reducer';
import { StoreModule } from '@ngrx/store';
import { SettingsEffects } from './store/settings.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    SettingsComponent,
    WebhooksComponent,
    DetailsComponent,
    ClearHooksComponent,
    ChangePassComponent,
    DisableAuthComponent,
    EnableAuthComponent,
    ConfirmCloseComponent,
    RecoveryKeysComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    StoreModule.forFeature('settingsModule', settingsModuleReducer),
    EffectsModule.forFeature([SettingsEffects]),
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class SettingsModule {}
