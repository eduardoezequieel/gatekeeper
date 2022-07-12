import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  ngOnDestroy(): void {}
}
