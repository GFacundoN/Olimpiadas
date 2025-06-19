import { Component, inject, OnInit } from '@angular/core';
import { Paquete } from '../models/paquete.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaquetesService } from '../services/paquetes.service';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../services/carrito.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-paquete-detalle',
  imports: [CurrencyPipe, RouterLink],
  template: `
    @if (paquete) {
      <h1 class="text-3xl font-bold">{{ paquete.nombre }}</h1>
      <ul>
        <li>Origen: {{ paquete.origen }}</li>
        <li>Destino: {{ paquete.destino }}</li>
      </ul>
      <h5 class="font-semibold text-green-700">Precio: {{ paquete.precio | currency }}</h5>
      <button #agregarAlCarrito
        class="rounded-2xl p-3 cursor-pointer border font-bold text-white bg-black"
        (click)="carrito.setToCarrito(this.paquete)">Agregar al carrito</button>
      <button class="rounded-2xl p-3 cursor-pointer border font-bold text-black bg-white" routerLink="../../checkout" (click)="checkout.getPaquete(paquete)">Comprar ahora</button>
      @defer (on interaction(agregarAlCarrito)) {
        <b class="font-bold text-green-700 uppercase">agregado al carrito!</b>
      }
    } @else {
      <b class="text-3xl">cargando info...</b>
    }
  `,
  styles: ``,
})
export class PaqueteDetalleComponent implements OnInit {
  rutaActiva = inject(ActivatedRoute);
  service = inject(PaquetesService);
  carrito = inject(CarritoService);
  checkout = inject(CheckoutService);

  paquetes!: Paquete[];
  paquete!: Paquete | undefined;

  ngOnInit(): void {
    this.service.getPaquetes().subscribe((data) => {
      this.paquetes = data;
    });
    setTimeout(() => {
      this.rutaActiva.params.subscribe((params) => {
        this.paquete = this.paquetes.find(
          (paquete) => paquete.id == params['id']
        );
      });
    }, 500);
  }
}