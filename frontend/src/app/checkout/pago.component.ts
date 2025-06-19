import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pago',
  imports: [RouterLink],
  template: `
    <label for="tarjeta">Número de la tarjeta</label>
    <input type="number" name="tarjeta" id="tarjeta">
    <br>
    <button class="rounded-2xl p-3 cursor-pointer border font-bold text-black bg-white" routerLink="../resumen">Continuar</button>
  `,
  styles: ``
})
export class PagoComponent {

}
