import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.userService.admin) {
      console.log("Logged as ADMIN")
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
