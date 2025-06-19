import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-paquete',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: `paquete.component.html`,
  styles: ``,
})
export class PaqueteComponent {
  @Input() id!: number;
  @Input() nombre!: string; // es el título que aparece en grande en cada tarjeta
  @Input() precio!: number;
  @Input() origen!: string;
  @Input() destino!: string;

  userService = inject(UserService);
}
