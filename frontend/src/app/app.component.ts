import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'olimpiadas-front';
  userService = inject(UserService);
}
