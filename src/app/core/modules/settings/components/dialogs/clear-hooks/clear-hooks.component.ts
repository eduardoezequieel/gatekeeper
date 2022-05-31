import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clear-hooks',
  templateUrl: './clear-hooks.component.html',
  styleUrls: ['./clear-hooks.component.scss'],
})
export class ClearHooksComponent {
  constructor(public dialogRef: MatDialogRef<ClearHooksComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
