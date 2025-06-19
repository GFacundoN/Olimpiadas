import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [CurrencyPipe, RouterLink],
  template: `
    <section class="border p-5 flex flex-row rounded justify-between">
      <h4 class="text-xl font-bold cursor-pointer" routerLink="../catalogo/{{ id }}">{{ nombre }}</h4>
      <b class="text-green-700">{{ precio | currency }}</b>
      <button class="font-bold uppercase cursor-pointer text-red-500" (click)="updateTotal()">Eliminar</button>
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
