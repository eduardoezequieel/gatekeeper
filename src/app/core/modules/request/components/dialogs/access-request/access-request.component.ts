import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { take } from 'rxjs';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { RequestNotificationService } from '../../../services/request-notification.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-access-request',
  templateUrl: './access-request.component.html',
  styleUrls: ['./access-request.component.scss'],
})
export class AccessRequestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  applications: Application[] = [];
  constructor(
    public dialogRef: MatDialogRef<AccessRequestComponent>,
    private fb: FormBuilder,
    private requestService: RequestService,
    private requestNotification: RequestNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: number[]
  ) {}

  ngOnInit(): void {
    this.requestService
      .getAllAplications(1, 84)
      .pipe(take(1))
      .subscribe((res) => {
        this.applications = res.data
          .filter((app) => app.enabled === true)
          .filter((app) => !this.data.includes(app.id));
      });

    this.form = this.fb.group({
      appName: ['', [Validators.required]],
      messageRequest: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() {
    return this.form.controls;
  }

  submitAccessRequest() {
    if (this.form.invalid) {
      return;
    }

    const appId = this.f['appName'].value;
    const message = this.f['messageRequest'].value;

    this.requestService
      .requestAccess(appId, message)
      .pipe(take(1))
      .subscribe(
        () => {
          this.requestNotification.requestAddedSuccessfullyOn();
          this.onNoClick();
        },
        () => {
          this.requestNotification.alreadyHaveAccessOn();
        }
      );
  }
}
