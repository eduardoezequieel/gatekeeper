import {
  filteredAppsRequests,
  appsRequests,
  pagination,
} from './../../store/requests.selectors';
import {
  clearFiltersFromRequests,
  getAppsRequests,
  getAppsRequestsSuccess,
  searchAppsRequests,
  updatePagination,
} from './../../store/requests.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { RequestNotificationService } from '../../services/request-notification.service';
import { RequestService } from '../../services/request.service';
import { RequestsModuleState } from '../../store/requests.reducer';

import { AproveRequestComponent } from '../dialogs/aprove-request/aprove-request.component';
import { DeleteAllComponent } from '../dialogs/delete-all/delete-all.component';
import { DenyRequestComponent } from '../dialogs/deny-request/deny-request.component';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss'],
})
export class AdminRequestComponent implements OnInit, OnDestroy {
  searchInput = new FormControl('');
  applications!: Observable<Application[]>;
  currentAppId!: number;
  noResults = true;
  requestSelected = false;
  twoFAuthEnabled = false;
  checkAll = false;
  displayedColumns: string[] = [
    'check',
    'No.',
    'employee',
    'app name',
    'Message',
    'status',
  ];
  dataSource!: MatTableDataSource<any>;
  unsubscribe$ = new Subject();
  pagination: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };
  requestsLength = 0;

  constructor(
    private dialog: MatDialog,
    private requestService: RequestService,
    public requestNotifications: RequestNotificationService,
    private userService: UserService,
    private store: Store<RequestsModuleState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.twoFAuthEnabled = this.userService.getUser().twoFactorEnabled;
    this.closeRequestMessages();
    this.applications = this.requestService.getOneAplications().pipe(
      switchMap((apps) => {
        const appNum = apps.pagination.totalItems;
        return this.requestService.getAllAplications(1, appNum).pipe(
          map((res) => {
            return res.filter((app) => app.enabled === true);
          })
        );
      })
    );

    if (!this.twoFAuthEnabled) {
      this.requestNotifications.enableTwoStepOn();
    }

    this.filter();
  }

  filter(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response) => {
        if (this.currentAppId) {
          if ((response as string).length == 0) {
            this.clearFilters();
          } else {
            this.store.dispatch(
              searchAppsRequests({ id: this.currentAppId, search: response })
            );

            this.store
              .pipe(select(filteredAppsRequests), take(1))
              .subscribe((response) => {
                this.dataSource = new MatTableDataSource(response);
              });

            this.store
              .pipe(select(filteredAppsRequests), takeUntil(this.unsubscribe$))
              .subscribe((response) => {
                this.dataSource = new MatTableDataSource(response);

                if (response.length < 1) {
                  this.noResults = true;
                } else {
                  this.noResults = false;
                }
              });
          }
        }
      });
  }

  clearFilters(): void {
    this.fillRequestTable(this.currentAppId);
    this.searchInput.setValue('');
    this.store.dispatch(clearFiltersFromRequests());
  }

  fillRequestTable(id: number) {
    this.searchInput.setValue('');
    this.store.dispatch(getAppsRequests({ id }));

    this.store
      .pipe(select(pagination), takeUntil(this.unsubscribe$))
      .subscribe(({ pagination, selectedAppId, adminRequestsLength }) => {
        this.pagination = pagination;
        this.currentAppId = selectedAppId;
        this.requestsLength = adminRequestsLength;
      });

    this.actions$
      .pipe(ofType(getAppsRequestsSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.requestsLength < 1) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      });

    this.store
      .pipe(select(appsRequests), takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
      });
  }
  onPageChange(pageEvent: PageEvent) {
    this.store.dispatch(updatePagination({ pageEvent }));

    if (this.requestsLength < this.pagination.length) {
      this.store.dispatch(getAppsRequests({ id: this.currentAppId }));
    }
  }
  openDenyManyDialog(): void {
    this.dialog.open(DeleteAllComponent, {
      width: '556px',
      data: {
        title: 'Deny Access Requests',
        desc: 'Are you sure you want to deny the selected access requests?',
        msg: 'Denied',
        btn: 'Deny',
        toBeDeleted: this.selectedRequests(),
      },
    });
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
      this.fillRequestTable(this.currentAppId);
      this.checkAll = false;
      this.requestSelected = false;
    });
  }

  openDenyDialog(requestId: string): void {
    if (!isNaN(Number(requestId))) {
      this.dialog.open(DenyRequestComponent, {
        width: '556px',
        data: Number(requestId),
      });
      this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
        this.fillRequestTable(this.currentAppId);
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
        requestId: request.id,
      },
    });
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
      this.fillRequestTable(this.currentAppId);
    });
  }
  openAproveManyAccess(): void {
    const request = this.selectedRequests();
    this.dialog.open(AproveRequestComponent, {
      width: '556px',
      data: {
        applicationId: this.currentAppId,
        requestArr: request,
      },
    });
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
      this.fillRequestTable(this.currentAppId);
      this.checkAll = false;
      this.requestSelected = false;
    });
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
