import { Component, inject, OnInit } from '@angular/core';
import { Paquete } from '../models/paquete.model';
import { CarritoService } from '../services/carrito.service';
import { ItemComponent } from '../item/item.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-carrito',
  imports: [ItemComponent, CurrencyPipe, RouterLink],
  template: `
    @if (paquetes.size != 0) {
      <section class="flex flex-col gap-5">
        @for (paquete of paquetes; track $index) {
          <app-item [id]="paquete.id" [nombre]="paquete.nombre" [precio]="paquete.precio" (nuevoTotal)="actualizarTotal(paquete.precio)" />
        }
      </section>
      <h3 class="font-bold text-2xl">Total a pagar: {{ total | currency }}</h3>
      <button class="rounded-2xl p-3 w-full cursor-pointer border font-bold text-black bg-white" routerLink="../checkout" (click)="checkout.getPaquetes(paquetes)">Comprar ahora</button>
    } @else {
      <i>no hay items para mostrar</i>
    }
  `,
  styles: ``
})
export class CarritoComponent implements OnInit {
  carritoService = inject(CarritoService);
  checkout = inject(CheckoutService);
  
  paquetes: Set<Paquete> = new Set<Paquete>();
  total!: number;

  actualizarTotal(precio: number) { // se resta el precio del item eliminado
    this.total -= precio;
  }

  ngOnInit(): void {
    this.paquetes = this.carritoService.getFromCarrito();
    this.total = this.carritoService.actualizarTotal();
  }
}
