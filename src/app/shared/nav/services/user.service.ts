import { Injectable } from '@angular/core';
import { Employee } from '../../interfaces/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUser(): Employee {
    return <Employee>JSON.parse(localStorage.getItem('user')!);
  }

  setUser(user: Employee) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
