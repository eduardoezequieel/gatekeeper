import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import { ApplicationsService } from '../../../../services/applications.service';

@Component({
  selector: 'app-change-roles',
  templateUrl: './change-roles.component.html',
  styleUrls: ['./change-roles.component.scss']
})
export class ChangeRolesComponent implements OnInit {

  roles!: Observable<Roles[]>;

  constructor(
    private dialogRef: MatDialogRef<ChangeRolesComponent>,
    private dialog: MatDialog,
    private applicationService: ApplicationsService,
    @Inject(MAT_DIALOG_DATA) public data: {user: string}
  ) {}

  ngOnInit(): void {
    this.roles = this.applicationService.getRoles()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  continueClick(): void {
    this.dialogRef.close();
    // this.dialog.open(ConfirmCloseComponent, {
    //   width: '556px',
    //   height: '200px',
    //   data: this.data,
    // });
  }
}
