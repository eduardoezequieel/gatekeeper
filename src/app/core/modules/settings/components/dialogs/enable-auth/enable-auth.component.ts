import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Generate2FA } from 'src/app/shared/interfaces/generate2-fa';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { SettingsErrorService } from '../../../services/settings-error.service';
import { SettingsService } from '../../../services/settings.service';
import { RecoveryKeysComponent } from '../recovery-keys/recovery-keys.component';

@Component({
  selector: 'app-enable-auth',
  templateUrl: './enable-auth.component.html',
  styleUrls: ['./enable-auth.component.scss'],
})
export class EnableAuthComponent {
  form: FormGroup = new FormGroup({});
  user!: User;
  auth!: Generate2FA;
  constructor(
    public dialogRef: MatDialogRef<EnableAuthComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private settingsService: SettingsService,
    private userService: UserService,
    public settingMessages: SettingsErrorService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.settingsService
      .generateTwoStep()
      .pipe(take(1))
      .subscribe((res) => {
        this.auth = res;
      });
    this.form = this.fb.group({
      codePassword: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  get f() {
    return this.form.controls;
  }
  acceptClick(): void {
    if (this.form.invalid) {
      return;
    }
    const token = this.f['codePassword'].value;
    this.settingsService
      .activateTwoStep(token)
      .pipe(take(1))
      .subscribe((res) => {
        this.settingsService.setEnabled(true);
        this.dialogRef.close();
        this.dialog.open(RecoveryKeysComponent, {
          width: '846px',
          data: res.data.twoFactorRecoveryKeys,
        });
        this.settingMessages.enableTwoStepSuccessOn();
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
