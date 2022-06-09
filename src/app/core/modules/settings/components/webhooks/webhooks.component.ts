import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { WebHook } from 'src/app/shared/interfaces/webHookResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { SettingsErrorService } from '../../services/settings-error.service';
import { SettingsService } from '../../services/settings.service';
import { ClearHooksComponent } from '../dialogs/clear-hooks/clear-hooks.component';
import { DetailsComponent } from '../dialogs/details/details.component';

@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.scss'],
})
export class WebhooksComponent implements OnInit {
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

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private settingsService: SettingsService,
    public settingMessages: SettingsErrorService
  ) {}

  ngOnInit(): void {
    this.fillTable();
    this.user = this.userService.getUser();
    if (this.user.role.id === 2) {
      this.admin = true;
    }
  }
  fillTable() {
    this.settingsService
      .getWebHooks(1, 10)
      .pipe(take(1))
      .subscribe((res) => {
        this.length = res.pagination.totalItems;
        console.log(this.length);
        if (this.length == 0) {
          this.settingMessages.noLogsOn();
        }
        this.dataSource = new MatTableDataSource(res.data);
      });
  }

  onPageChange(pageEvent: PageEvent) {
    this.settingsService
      .getWebHooks(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .pipe(take(1))
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
      });
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
    this.dialog.afterAllClosed.subscribe(() => {
      this.fillTable();
    });
  }

  closeSettingsError() {
    this.settingMessages.turnErrorsOff();
  }
}
