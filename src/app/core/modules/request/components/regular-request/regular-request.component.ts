import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { RequestNotificationService } from '../../services/request-notification.service';
import { RequestService } from '../../services/request.service';
import { AccessRequestComponent } from '../dialogs/access-request/access-request.component';
import { DeleteAllComponent } from '../dialogs/delete-all/delete-all.component';
import { DeleteOneComponent } from '../dialogs/delete-one/delete-one.component';

@Component({
  selector: 'app-regular-request',
  templateUrl: './regular-request.component.html',
  styleUrls: ['./regular-request.component.scss'],
})
export class RegularRequestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  requestSelected: boolean = false;
  noResults!: boolean;
  checkAll = false;
  length!: number;
  displayedColumns: string[] = [
    'check',
    'No.',
    'app name',
    'Message',
    'Delete',
  ];
  dataSource!: MatTableDataSource<any>;
  searchKey!: string;
  constructor(
    private dialog: MatDialog,
    private requestService: RequestService,
    public requestNotifications: RequestNotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.closeRequestMessages();
    this.fillRequestTable();
  }

  get f() {
    return this.form.controls;
  }

  fillRequestTable() {
    this.requestService
      .getUserRequests(1, 10)
      .pipe(take(1))
      .subscribe((res) => {
        this.length = res.pagination.totalItems;
        if (this.length < 1) {
          this.noResults = false;
        } else {
          this.noResults = true;
        }
        res.data.forEach((request) => {
          request.isSelected = false;
        });
        this.dataSource = new MatTableDataSource(res.data);

        this.dataSource.filterPredicate = (data, filter) => {
          return data.application.name.toLocaleLowerCase().includes(filter);
        };
      });
  }

  onPageChange(pageEvent: PageEvent) {
    this.requestService
      .getUserRequests(pageEvent.pageIndex + 1, pageEvent.pageSize)
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

  openDeleteAllDialog(): void {
    const checkedRequests = this.deleteChecks();
    if (!this.checkAll) {
      this.dialog.open(DeleteAllComponent, {
        width: '556px',
        data: {
          title: 'Delete access requests',
          desc: 'Are you sure you want to delete the selected access requests?',
          msg: 'Deleted',
          btn: 'Delete',
          toBeDeleted: checkedRequests,
        },
      });
    } else {
      this.dialog.open(DeleteAllComponent, {
        width: '556px',
        data: {
          title: 'Delete all access requests',
          desc: 'Are you sure you want to delete all the access requests?',
          msg: 'Deleted',
          btn: 'Delete',
          toBeDeleted: checkedRequests,
        },
      });
    }
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
      this.fillRequestTable();
      this.checkAll = false;
      this.requestSelected = false;
    });
  }

  openDeleteOneDialog(requestId: string): void {
    if (!isNaN(Number(requestId))) {
      this.dialog.open(DeleteOneComponent, {
        width: '556px',
        data: Number(requestId),
      });
      this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
        this.fillRequestTable();
        this.checkAll = false;
        this.requestSelected = false;
      });
    }
  }

  openRequestAccess(): void {
    const alreadyRequested: number[] = [];
    this.dataSource.data.forEach((req) => {
      alreadyRequested.push(req.application.id);
    });

    this.dialog.open(AccessRequestComponent, {
      width: '556px',
      data: alreadyRequested,
    });
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
      this.fillRequestTable();
    });
  }

  filterData() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.noResults = false;
    } else {
      this.noResults = true;
    }
  }

  deleteChecks() {
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
    this.requestSelected = checked;

    const allSelected = this.dataSource.data.filter(
      (data) => data.isSelected === false
    ).length;
    if (allSelected < 1) {
      this.checkAll = true;
    }
  }

  closeRequestMessages() {
    this.requestNotifications.turnErrorsOff();
  }
}
