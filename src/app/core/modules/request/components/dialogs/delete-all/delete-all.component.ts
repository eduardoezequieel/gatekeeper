import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ApplicationAccess } from 'src/app/shared/interfaces/allRequestsResponse';
import { RequestNotificationService } from '../../../services/request-notification.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss'],
})
export class DeleteAllComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteAllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private requestNotification: RequestNotificationService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteAll() {
    this.data.toBeDeleted.forEach((request: ApplicationAccess) => {
      this.requestService
        .deleteAccessRequest(request.id)
        .pipe(take(1))
        .subscribe(() => {});
    });

    if (this.data.btn === 'Deny') {
      this.requestNotification.requestDeniedOn();
    } else {
      this.requestNotification.requestDeletedSuccessfullyOn();
    }

    this.onNoClick();
  }
}
