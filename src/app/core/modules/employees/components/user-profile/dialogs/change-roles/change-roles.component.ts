import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { take, tap } from 'rxjs';
import { ApplicationsService } from '../../../../services/applications.service';
import { EmployeesService } from '../../../../services/employees.service';

interface aux {roleName: string, roleId: number, isSelected: boolean}

@Component({
  selector: 'app-change-roles',
  templateUrl: './change-roles.component.html',
  styleUrls: ['./change-roles.component.scss']
})


export class ChangeRolesComponent implements OnInit {
  roles: aux[] = []
  roleSelected = ''

  constructor(
    private dialogRef: MatDialogRef<ChangeRolesComponent>,
    private dialog: MatDialog,
    private applicationService: ApplicationsService,
    private employeeService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: {userName: string, userRole: string, userId: number}
  ) {}

  ngOnInit(): void {
    this.applicationService.getRoles().pipe(
      tap( roles => {
        roles.forEach( rol => {
          if(rol.name == this.data.userRole) {
            this.roles.push({roleName: rol.name, roleId: rol.id, isSelected: true})
          } else {
            this.roles.push({roleName: rol.name, roleId: rol.id, isSelected: false})
          }
        })

      }),
      take(1),
      ).subscribe()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  continueClick(): void {
    this.dialogRef.close();
    this.employeeService.changeRole(this.data.userId, +this.roleSelected)
  }
}
