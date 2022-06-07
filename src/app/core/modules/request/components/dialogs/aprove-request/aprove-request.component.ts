import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-aprove-request',
  templateUrl: './aprove-request.component.html',
  styleUrls: ['./aprove-request.component.scss'],
})
export class AproveRequestComponent implements OnInit {
  roles!: Roles[];
  roleSelected = false;
  constructor(
    public dialogRef: MatDialogRef<AproveRequestComponent>,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.requestService
      .getApplicationRoles(this.data.applicationId)
      .pipe(take(1))
      .subscribe((res) => {
        res.data.forEach((request) => {
          request.isSelected = false;
        });

        this.roles = res.data;
      });
  }

  aproveRequest() {
    if (this.getRolesSelected().length > 0) {
      this.requestService
        .aproveAccessRequest(
          this.data.applicationId,
          this.data.employeeId,
          this.getRolesSelected()
        )
        .pipe(take(1))
        .subscribe(() => {
          console.log('Access request aproved');
          this.onNoClick();
        });
    } else {
      console.log('please select role');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getRolesSelected() {
    let rolesIds: number[] = [];
    this.roles.forEach((role) => {
      if (role.isSelected) {
        rolesIds.push(role.id);
      }
    });
    return rolesIds;
  }

  checkRequest(event: any) {
    const id = event.target.value;
    const isChecked = event.target.checked;

    this.roles = this.roles.map((d) => {
      if (d.id == id) {
        d.isSelected = isChecked;
        return d;
      }
      return d;
    });
    const checked = this.roles.some((data) => data.isSelected === true);
    this.roleSelected = checked;
  }
}
