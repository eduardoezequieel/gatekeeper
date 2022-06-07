import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { RequestService } from '../../services/request.service';
import { AccessRequestComponent } from '../dialogs/access-request/access-request.component';
import { AproveRequestComponent } from '../dialogs/aprove-request/aprove-request.component';
import { DeleteAllComponent } from '../dialogs/delete-all/delete-all.component';
import { DeleteOneComponent } from '../dialogs/delete-one/delete-one.component';
import { DenyRequestComponent } from '../dialogs/deny-request/deny-request.component';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss'],
})
export class AdminRequestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  applications: Application[] = [];
  currentApp!: any;
  requestSelected: boolean = false;
  checkAll = false;
  length!: number;
  displayedColumns: string[] = [
    'check',
    'No.',
    'employee',
    'app name',
    'Message',
    'status',
  ];
  dataSource!: MatTableDataSource<any>;
  searchKey!: string;
  constructor(
    private dialog: MatDialog,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.requestService
      .getAllAplications(1, 84)
      .pipe(take(1))
      .subscribe((res) => {
        this.applications = res.data;
      });
    //this.fillRequestTable();
  }

  get f() {
    return this.form.controls;
  }

  fillRequestTable(event: any) {
    this.currentApp = event;
    this.requestService
      .appsAccessRequests(event.value, 1, 10)
      .pipe(take(1))
      .subscribe((res) => {
        this.length = res.pagination.totalItems;
        res.data.forEach((request) => {
          request.isSelected = false;
        });
        this.dataSource = new MatTableDataSource(res.data);
        //console.log(this.dataSource.data.length);
        this.dataSource.filterPredicate = (data, filter) => {
          return data.application.name.toLocaleLowerCase().includes(filter);
        };
      });
  }
  onPageChange(pageEvent: PageEvent) {
    this.requestService
      .appsAccessRequests(
        this.currentApp,
        pageEvent.pageIndex + 1,
        pageEvent.pageSize
      )
      .pipe(take(1))
      .subscribe((res) => {
        res.data.forEach((request) => {
          request.isSelected = false;
        });
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.filterPredicate = (data, filter) => {
          return data.application.name.toLocaleLowerCase().includes(filter);
        };
      });
  }
  openDenyManyDialog(): void {
    this.dialog.open(DeleteAllComponent, {
      width: '556px',
      height: '200px',
      data: {
        title: 'Deny Access Requests',
        desc: 'Are you sure you want to deny the selected access requests?',
        msg: 'Denied',
        btn: 'Deny',
        toBeDeleted: this.selectedRequests(),
      },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.fillRequestTable(this.currentApp);
    });
  }

  openDenyDialog(requestId: string): void {
    if (!isNaN(Number(requestId))) {
      this.dialog.open(DenyRequestComponent, {
        width: '556px',
        height: '200px',
        data: Number(requestId),
      });
      this.dialog.afterAllClosed.subscribe(() => {
        this.fillRequestTable(this.currentApp);
      });
    } else {
      console.log('Not a Number');
    }
  }

  openAproveAccess(appRequest: string): void {
    const request = this.dataSource.data.find((data) => data.id == appRequest);
    this.dialog.open(AproveRequestComponent, {
      width: '556px',
      data: {
        applicationId: request.application.id,
        employeeId: request.employee.id,
      },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.fillRequestTable(this.currentApp);
    });
  }
  openAproveManyAccess(): void {
    this.selectedRequests().forEach((request) => {
      console.log(request);
      this.dialog.open(AproveRequestComponent, {
        width: '556px',
        data: {
          applicationId: request.application.id,
          employeeId: request.employee.id,
        },
      });
      this.dialog.afterAllClosed.subscribe(() => {
        this.fillRequestTable(this.currentApp);
      });
    });
  }

  filterData() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  selectedRequests() {
    return this.dataSource.data.filter((data) => data.isSelected === true);
  }

  checkRequest(event: any) {
    const id = event.target.value;
    const isChecked = event.target.checked;

    this.dataSource.data = this.dataSource.data.map((d) => {
      if (d.id == id) {
        d.isSelected = isChecked;
        this.checkAll = false;
        return d;
      }
      if (id == -1) {
        d.isSelected = this.checkAll;
        return d;
      }
      return d;
    });
    const checked = this.dataSource.data.some(
      (data) => data.isSelected === true
    );
    if (checked) {
      this.requestSelected = true;
    } else {
      this.requestSelected = false;
    }
  }

  closeRequestMessages() {}
}
