import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  template: `
    <h3 class="text-xl">Iniciar sesión como:</h3> <!-- temporal para desarrollo -->
    <button class="rounded-2xl p-3 cursor-pointer border font-bold text-white bg-blue-500" routerLink="" (click)="userService.logAsUser()">Usuario regular</button>
    <button class="rounded-2xl p-3 cursor-pointer border font-bold text-white bg-orange-500" routerLink="" (click)="userService.logAsJefe()">Jefe de venta</button>
    
    <form class="[&>input]:border">
      <input type="text" name="username" id="username" placeholder="username">
      <input type="password" name="password" id="password" placeholder="password">
      <input type="submit" value="Iniciar sesión">
    </form>
  `,
  styles: ``
})
export class LoginComponent {
  userService = inject(UserService);

  
}
