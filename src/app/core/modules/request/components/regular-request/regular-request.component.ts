import {
  filteredUserRequests, pagination,
} from './../../store/requests.selectors';
import {
  updatePagination,
  searchUserRequests,
  clearFiltersFromRequests,
} from './../../store/requests.actions';
import { RequestsModuleState } from './../../store/requests.reducer';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import {
  take,
  Subject,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { RequestNotificationService } from '../../services/request-notification.service';
import { RequestService } from '../../services/request.service';
import { AccessRequestComponent } from '../dialogs/access-request/access-request.component';
import { DeleteAllComponent } from '../dialogs/delete-all/delete-all.component';
import { DeleteOneComponent } from '../dialogs/delete-one/delete-one.component';
import {
  userRequests,
} from '../../store/requests.selectors';
import {
  getUserRequests,
  getUserRequestsSuccess,
} from '../../store/requests.actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-regular-request',
  templateUrl: './regular-request.component.html',
  styleUrls: ['./regular-request.component.scss'],
})
export class RegularRequestComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  requestSelected: boolean = false;
  noResults = false;
  checkAll = false;
  displayedColumns: string[] = [
    'check',
    'No.',
    'app name',
    'Message',
    'Delete',
  ];
  dataSource!: MatTableDataSource<any>;
  searchInput = new FormControl('');
  unsubscribe$ = new Subject();
  pagination!: PageEvent;
  requestsLength = 0;

  constructor(
    private dialog: MatDialog,
    private requestService: RequestService,
    public requestNotifications: RequestNotificationService,
    private store: Store<RequestsModuleState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.closeRequestMessages();
    this.fillRequestTable();
    this.filter();
  }

  fillRequestTable() {
    this.store.dispatch(getUserRequests());

    this.store
      .pipe(select(pagination), takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.pagination = response.pagination;
        this.requestsLength = response.regularRequestsLength;
      });

    this.actions$
      .pipe(ofType(getUserRequestsSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.requestsLength < 1) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      });

    this.store
      .pipe(select(userRequests), takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
      });
  }

  filter(): void {
    this.searchInput.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe((response) => {
        if ((response as string).length == 0) {
          this.clearFilters();
        } else {
          this.store.dispatch(searchUserRequests({ search: response }));

          this.store
            .pipe(takeUntil(this.unsubscribe$), select(filteredUserRequests))
            .subscribe((response) => {
              this.dataSource = new MatTableDataSource(response);

              if (response.length < 1) {
                this.noResults = true;
              } else {
                this.noResults = false;
              }
            });
        }
      });
  }

  clearFilters(): void {
    this.fillRequestTable();
    this.searchInput.setValue('');
    this.store.dispatch(clearFiltersFromRequests());
  }

  onPageChange(pageEvent: PageEvent) {
    this.store.dispatch(updatePagination({ pageEvent }));

    if (this.requestsLength < this.pagination.length) {
      this.store.dispatch(getUserRequests());
    }
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

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
