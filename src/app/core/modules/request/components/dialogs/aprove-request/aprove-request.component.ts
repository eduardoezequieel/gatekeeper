import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ApplicationAccess } from 'src/app/shared/interfaces/allRequestsResponse';
import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import { RequestNotificationService } from '../../../services/request-notification.service';
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
    private requestNotifications: RequestNotificationService,
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

        if (this.roles.length < 1) {
          this.requestNotifications.noRolesAvailableOn();
        }
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
          this.requestNotifications.requestAprovedOn();
        });
      this.requestService
        .deleteAccessRequest(this.data.requestId)
        .pipe(take(1))
        .subscribe(() => {});
      this.onNoClick();
    } else {
      this.requestNotifications.selectRoleOn();
    }
  }

  aproveManyRequest() {
    if (this.getRolesSelected().length > 0) {
      this.data.requestArr.forEach((req: ApplicationAccess) => {
        this.requestService
          .aproveAccessRequest(
            this.data.applicationId,
            req.employee.id,
            this.getRolesSelected()
          )
          .pipe(take(1))
          .subscribe(() => {
            this.requestNotifications.requestAprovedOn();
          });

        this.requestService
          .deleteAccessRequest(req.id)
          .pipe(take(1))
          .subscribe(() => {});
        this.onNoClick();
      });
    } else {
      this.requestNotifications.selectRoleOn();
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
