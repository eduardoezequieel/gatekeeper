import * as settingsActions from './../../store/settings.actions';
import { SettingsModuleState } from './../../store/settings.reducer';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { WebHook } from 'src/app/shared/interfaces/webHookResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { SettingsErrorService } from '../../services/settings-error.service';
import { SettingsService } from '../../services/settings.service';
import { ClearHooksComponent } from '../dialogs/clear-hooks/clear-hooks.component';
import { DetailsComponent } from '../dialogs/details/details.component';
import { pagination, webhooks } from '../../store/settings.selectors';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.scss'],
})
export class WebhooksComponent implements OnInit, OnDestroy {
  user!: User;
  actualPage!: PageEvent;
  admin = false;
  length!: number;
  displayedColumns: string[] = [
    'No.',
    'WebHook URL',
    'Event',
    'Status Code',
    'Response',
  ];
  dataSource!: MatTableDataSource<any>;
  pagination!: PageEvent;
  webhooksLength = 0;
  unsubscribe$ = new Subject();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    public settingMessages: SettingsErrorService,
    private store: Store<SettingsModuleState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.fillTable();
    this.user = this.userService.getUser();
    if (this.user.role.id === 2) {
      this.admin = true;
    }

    this.store
      .pipe(select(pagination), takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.pagination = response.pagination;
        this.webhooksLength = response.webhooksLength;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  fillTable() {
    this.store.dispatch(settingsActions.getWebHooks());

    this.store
      .pipe(select(webhooks), takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
      });

    this.noWebhooksMessage();
  }

  noWebhooksMessage(): void {
    this.actions$
      .pipe(
        takeUntil(this.unsubscribe$),
        ofType(settingsActions.getWebHooksSuccess)
      )
      .subscribe(() => {
        if (this.webhooksLength == 0) {
          this.settingMessages.noLogsOn();
        }
      });
  }

  onPageChange($event: PageEvent) {
    this.store.dispatch(
      settingsActions.updatePagination({ pageEvent: $event })
    );

    if (this.webhooksLength < this.pagination.length) {
      this.store.dispatch(settingsActions.getWebHooks());
    }
  }

  openDetailsDialog(detail: string): void {
    let msg = '';
    const parsed = JSON.parse(detail);
    if (parsed != null) {
      if (parsed.errors) {
        parsed.errors[0].description.forEach((element: any) => {
          msg = msg + element + ', ';
        });
      } else if (parsed.error) {
        msg = parsed.error.message;
      }
    } else {
      msg = 'No details found';
    }
    this.dialog.open(DetailsComponent, {
      width: '556px',
      data: msg,
    });
  }
  openClearDialog(): void {
    this.dialog.open(ClearHooksComponent, {
      width: '556px',
    });
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
      this.fillTable();
    });
  }

  closeSettingsError() {
    this.settingMessages.turnErrorsOff();
  }
}
