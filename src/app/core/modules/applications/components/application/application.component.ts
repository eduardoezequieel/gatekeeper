import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  @Input() application!: Application;

  constructor() {}

  ngOnInit(): void {}
}
