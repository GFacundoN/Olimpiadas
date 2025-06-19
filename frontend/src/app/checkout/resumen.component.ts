import { Component, inject, OnInit } from '@angular/core';
import { Paquete } from '../models/paquete.model';
import { CheckoutService } from '../services/checkout.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-resumen',
  imports: [CurrencyPipe],
  template: `
    @if (paquete) { <!-- en compra individual muestra uno solo -->
      <p>{{ paquete.nombre }}, {{ paquete.precio | currency }}</p>
    } @else if (paquetes) {
      <!-- de caso que haya varios, se ejecuta el for -->
      @for (paquete of paquetes; track $index) {
        <p>{{ paquete.nombre }}, {{ paquete.precio | currency }}</p>
      }
    }
    <button class="rounded-2xl p-3 cursor-pointer border font-bold text-black bg-white" routerLink="pago">Confirmar compra</button>
  `,
  styles: ``
})
export class ResumenComponent implements OnInit {
  checkoutService = inject(CheckoutService);

  paquetes!: Set<Paquete> | undefined;
  paquete!: Paquete | undefined;

  ngOnInit(): void {
    this.paquete = this.checkoutService.showPaquete();
    this.paquetes = this.checkoutService.showPaquetes();
  }
}
