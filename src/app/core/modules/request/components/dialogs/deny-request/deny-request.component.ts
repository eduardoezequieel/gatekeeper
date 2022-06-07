import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-deny-request',
  templateUrl: './deny-request.component.html',
  styleUrls: ['./deny-request.component.scss'],
})
export class DenyRequestComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DenyRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  denyRequest() {
    this.requestService
      .deleteAccessRequest(this.data)
      .pipe(take(1))
      .subscribe(() => {
        console.log('Request Access Denies');
      });
    this.onNoClick();
  }
}
