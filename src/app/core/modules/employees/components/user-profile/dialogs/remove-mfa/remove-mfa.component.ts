import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmployeesService } from '../../../../services/employees.service';

@Component({
  selector: 'app-remove-mfa',
  templateUrl: './remove-mfa.component.html',
  styleUrls: ['./remove-mfa.component.scss']
})
export class RemoveMfaComponent {

  subs!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<RemoveMfaComponent>,
    public dialog: MatDialog,
    private employeeService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: {employeeId: number}
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.subs = this.employeeService.removeMFA(this.data.employeeId).subscribe()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  // goBackClick(): void {
  //   this.dialogRef.close();
  //   this.dialog.open(RecoveryKeysComponent, {
  //     width: '846px',
  //     height: '504px',
  //     data: this.data,
  //   });
  // }

}
