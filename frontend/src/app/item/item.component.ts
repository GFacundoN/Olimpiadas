import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [CurrencyPipe, RouterLink],
  template: `
<section class="bg-gray-50 p-4 flex items-center justify-between gap-4 rounded-xl shadow-md">
    <h4
        class="text-base sm:text-lg font-semibold text-black cursor-pointer hover:underline"
        routerLink="../catalogo/{{ id }}"
    >
        {{ nombre }}
    </h4>

    <b class="text-green-700 text-sm sm:text-base">{{ precio | currency }}</b>

    <button
        class="text-red-500 font-semibold uppercase text-sm sm:text-base hover:underline transition cursor-pointer"
        (click)="updateTotal()"
    >
        Eliminar
    </button>
</section>

  `,
  styles: ``
})
export class ItemComponent {
  @Input() id!: number;
  @Input() nombre!: string;
  @Input() precio!: number;
  
  // evento destinado a la actualizacion del total en componente padre, el carrito
  @Output() nuevoTotal = new EventEmitter<number>();

  carritoService = inject(CarritoService);

  updateTotal() {
    this.carritoService.removeFromCarrito(this.id);
    this.nuevoTotal.emit(this.precio); // el evento se emite con el click de eliminación
  }
}
