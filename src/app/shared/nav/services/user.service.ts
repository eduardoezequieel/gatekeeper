import { Injectable } from '@angular/core';
import { User } from '../../interfaces/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUser(): User {
    return <User>JSON.parse(localStorage.getItem('user')!);
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
