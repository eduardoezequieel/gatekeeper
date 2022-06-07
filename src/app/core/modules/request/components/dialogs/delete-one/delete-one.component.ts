import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-delete-one',
  templateUrl: './delete-one.component.html',
  styleUrls: ['./delete-one.component.scss'],
})
export class DeleteOneComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteOneComponent>,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteRequest() {
    this.requestService
      .deleteAccessRequest(this.data)
      .pipe(take(1))
      .subscribe(() => {
        console.log('Request deleted successfully');
        this.onNoClick();
      });
    this.onNoClick();
  }
}
