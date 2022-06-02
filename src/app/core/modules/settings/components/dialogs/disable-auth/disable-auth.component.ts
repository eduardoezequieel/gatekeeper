import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-disable-auth',
  templateUrl: './disable-auth.component.html',
  styleUrls: ['./disable-auth.component.scss'],
})
export class DisableAuthComponent {
  form: FormGroup = new FormGroup({});
  constructor(
    public dialogRef: MatDialogRef<DisableAuthComponent>,
    private fb: FormBuilder,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      recoveryCode: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  disableAuth(): void {
    if (this.form.invalid) {
      return;
    }
    const token = this.f['recoveryCode'].value;
    this.settingsService
      .deactivateTwoStep(token)
      .pipe(take(1))
      .subscribe((res) => {
        this.settingsService.setEnabled(false);
        this.dialogRef.close();
      });
  }
}
