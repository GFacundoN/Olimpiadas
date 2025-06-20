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
  templateUrl: './carrito.component.html',
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
