import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecoveryKeysComponent } from '../recovery-keys/recovery-keys.component';

@Component({
  selector: 'app-enable-auth',
  templateUrl: './enable-auth.component.html',
  styleUrls: ['./enable-auth.component.scss'],
})
export class EnableAuthComponent {
  form: FormGroup = new FormGroup({});
  constructor(
    public dialogRef: MatDialogRef<EnableAuthComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codePassword: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }
  acceptClick(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close();
    this.dialog.open(RecoveryKeysComponent, {
      width: '846px',
      height: '504px',
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
