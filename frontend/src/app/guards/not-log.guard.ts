import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotLogGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(): boolean {
    if (!this.userService.logged) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
