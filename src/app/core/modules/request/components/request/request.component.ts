import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  admin = false;
  user!: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (this.user.role.id === 2) {
      this.admin = true;
    }
  }
}
