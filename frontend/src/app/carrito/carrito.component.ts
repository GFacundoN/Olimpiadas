import { Component, inject, OnInit } from '@angular/core';
import { Paquete } from '../models/paquete.model';
import { CarritoService } from '../services/carrito.service';
import { ItemComponent } from '../item/item.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [ItemComponent, CurrencyPipe, RouterLink, CommonModule],
  templateUrl: './carrito.component.html',
  styles: ``,
})
export class CarritoComponent implements OnInit {
  carritoService = inject(CarritoService);
  checkout = inject(CheckoutService);
  paquetesArray: Paquete[] = [];


  paquetes: Set<Paquete> = new Set<Paquete>();
  total: number = 0;

actualizarTotal(id: number) {
    this.paquetes = this.carritoService.getFromCarrito();
    this.paquetesArray = Array.from(this.paquetes);
    this.total = this.carritoService.actualizarTotal();

    // Actualiza localStorage con los paquetes actuales para el resumen
    localStorage.setItem('paquetesSeleccionados', JSON.stringify(this.paquetesArray));
}



  ngOnInit(): void {
    this.paquetes = this.carritoService.getFromCarrito();
    this.paquetesArray = Array.from(this.paquetes);
    this.total = this.carritoService.actualizarTotal();
  }
}