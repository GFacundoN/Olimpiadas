import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  logged = false;
  admin: boolean | null = false;

  logAsUser() {
    this.logged = true;
    this.admin = false;
  }

  logAsJefe() {
    this.logged = true;
    this.admin = true;
  }

  logout() {
    this.logged = false;
    this.admin = null;
  }
}
