import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { Employee } from 'src/app/shared/interfaces/loginResponse';
import { WebHook } from 'src/app/shared/interfaces/webHookResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import { SettingsService } from '../../services/settings.service';
import { ClearHooksComponent } from '../dialogs/clear-hooks/clear-hooks.component';
import { DetailsComponent } from '../dialogs/details/details.component';

// const ELEMENT_DATA!: WebHook[];
@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.scss'],
})
export class WebhooksComponent implements OnInit {
  user!: Employee;
  actualPage!: PageEvent;
  admin = false;
  displayedColumns: string[] = [
    'No.',
    'WebHook URL',
    'Event',
    'Status Code',
    'Response',
  ];
  dataSource!: WebHook[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
    // this.onPageChange(1);
    this.settingsService
      .getWebHooks()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res.data);
        this.dataSource = res.data;
      });
    this.user = this.userService.getUser();
    if (this.user.role.id === 2) {
      this.admin = true;
    }
  }

  // onPageChange($event: PageEvent) {
  //   this.actualPage = $event;
  //   this.dataSource = ELEMENT_DATA.slice(
  //     $event.pageIndex * $event.pageSize,
  //     $event.pageIndex * $event.pageSize + $event.pageSize
  //   );
  // }

  clickDetails(value: string) {
    console.log(value);
  }

  openDetailsDialog(response: string): void {
    this.dialog.open(DetailsComponent, {
      width: '556px',
      height: '200px',
      data: response,
    });
  }
  openClearDialog(): void {
    this.dialog.open(ClearHooksComponent, {
      width: '556px',
      height: '200px',
    });
  }
}
