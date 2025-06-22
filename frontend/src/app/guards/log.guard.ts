import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.userService.logged) {
      console.log("LOGGED")
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
