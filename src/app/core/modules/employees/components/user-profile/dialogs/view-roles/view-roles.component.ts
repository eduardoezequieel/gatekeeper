import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, take, tap } from 'rxjs';
import { AppsRoles } from 'src/app/shared/interfaces/rolesOfEmployeeInApp';
import { ApplicationsService } from '../../../../services/applications.service';

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.scss'],
})
export class ViewRolesComponent implements OnInit {
  roles$!: Observable<AppsRoles[]>;
  selection = new SelectionModel<AppsRoles>(true, []);

  constructor(
    private dialogRef: MatDialogRef<ViewRolesComponent>,
    private applicationService: ApplicationsService,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: string; app: number; userId: number }
  ) {}

  ngOnInit(): void {
    this.roles$ = this.applicationService
      .getRolesOfEmployeeInApp(this.data.app, this.data.userId)
      .pipe(
        tap((resp) =>
          resp.forEach((rol) => {
            if (rol.assigned) {
              this.selection.toggle(rol);
            }
          })
        )
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  continueClick(): void {
    let roles = this.selection.selected.map((elem) => elem.id);
    this.applicationService
      .updateRolesOfEmployeeInApp(this.data.app, this.data.userId, roles)
      .pipe(take(1))
      .subscribe();
    this.dialogRef.close({
      event: 'close',
      data: this.selection.selected.length,
    });
  }
}
