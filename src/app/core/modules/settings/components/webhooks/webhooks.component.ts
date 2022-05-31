import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClearHooksComponent } from '../dialogs/clear-hooks/clear-hooks.component';
import { DetailsComponent } from '../dialogs/details/details.component';
export interface PeriodicElement {
  id: number;
  url: string;
  event: string;
  code: string;
  response: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    url: 'URL 1',
    event: 'AddRole',
    code: '201',
    response: 'Details 1',
  },
  {
    id: 2,
    url: 'URL 2',
    event: 'AddRole',
    code: '201',
    response: 'Details 2',
  },
  {
    id: 3,
    url: 'URL 3',
    event: 'AddRole',
    code: '201',
    response: 'Details 3',
  },
  {
    id: 4,
    url: 'URL 4',
    event: 'AddRole',
    code: '201',
    response: 'Details 4',
  },
  {
    id: 5,
    url: 'URL 5',
    event: 'AddRole',
    code: '201',
    response: 'Details 5',
  },
  {
    id: 6,
    url: 'URL 6',
    event: 'AddRole',
    code: '201',
    response: 'Details 6',
  },
  {
    id: 7,
    url: 'URL 7',
    event: 'AddRole',
    code: '201',
    response: 'Details 7',
  },
  {
    id: 8,
    url: 'URL 8',
    event: 'AddRole',
    code: '201',
    response: 'Details 8',
  },
  {
    id: 9,
    url: 'URL 9',
    event: 'AddRole',
    code: '201',
    response: 'Details 9',
  },
  {
    id: 10,
    url: 'URL 10',
    event: 'AddRole',
    code: '201',
    response: 'Details 10',
  },
];
@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.scss'],
})
export class WebhooksComponent {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = [
    'No.',
    'WebHook URL',
    'Event',
    'Status Code',
    'Response',
  ];
  dataSource = ELEMENT_DATA;

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
