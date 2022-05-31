import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-disable-auth',
  templateUrl: './disable-auth.component.html',
  styleUrls: ['./disable-auth.component.scss'],
})
export class DisableAuthComponent {
  form: FormGroup = new FormGroup({});
  constructor(
    public dialogRef: MatDialogRef<DisableAuthComponent>,
    private fb: FormBuilder
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
    this.dialogRef.close();
  }
}
