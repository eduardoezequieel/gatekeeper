import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmployeesService } from '../../../../services/employees.service';
import { WarningsService } from '../../../../services/warnings.service';

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
    private warnings: WarningsService,
    private employeeService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: {employeeId: number}
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.subs = this.employeeService.removeMFA(this.data.employeeId).subscribe( () => {}, () => this.warnings.noRootOn())
  }
}
