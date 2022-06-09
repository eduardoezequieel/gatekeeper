import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { CustomValidators } from 'src/app/core/modules/login/validators/passwordMatch';
import { SettingsErrorService } from '../../../services/settings-error.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  invalidLoing!: Boolean;
  floatLabelControl = new FormControl('auto');

  constructor(
    public dialogRef: MatDialogRef<ChangePassComponent>,
    private fb: FormBuilder,
    private settingsService: SettingsService,
    public settingMessages: SettingsErrorService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: CustomValidators.mustMatch(
          'newPassword',
          'confirmPassword'
        ),
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() {
    return this.form.controls;
  }

  submitUpdatePass() {
    if (this.form.invalid) {
      return;
    }
    const current = this.f['currentPassword'].value;
    const newPass = this.f['newPassword'].value;
    const confirm = this.f['confirmPassword'].value;

    this.settingsService
      .changePassword(current, newPass, confirm)
      .pipe(take(1))
      .subscribe(
        () => {
          this.settingMessages.passwordChangedOn();
          this.dialogRef.close();
        },
        () => {
          this.settingMessages.wrongPasswordOn();
        }
      );
  }
}
