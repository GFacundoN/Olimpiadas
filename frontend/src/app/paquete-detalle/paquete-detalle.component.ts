import { Component, inject, OnInit } from '@angular/core';
import { Paquete } from '../models/paquete.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaquetesService } from '../services/paquetes.service';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../services/carrito.service';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-paquete-detalle',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './paquete-detalle.component.html',
  styles: ``,
})
export class PaqueteDetalleComponent implements OnInit {
    rutaActiva = inject(ActivatedRoute);
    service = inject(PaquetesService);
    carrito = inject(CarritoService);
    checkout = inject(CheckoutService);

    paquetes!: Paquete[];
    paquete!: Paquete | undefined;

    constructor(
        private carritoService: CarritoService,
        private userService: UserService,
        private router: Router
    ) {}

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

    agregarAlCarrito(paquete: Paquete): void {
    if (!this.userService.isLogged()) {
        this.router.navigate(['/login'], {
            queryParams: { returnUrl: '/catalogo' }
        });
        return;
    }

    // Lógica en memoria (por si usás el servicio en otras partes)
    this.carritoService.setToCarrito(paquete);

    // Lógica persistente (para el resumen final)
    const carritoGuardado = localStorage.getItem('paquetesSeleccionados');
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Evitar duplicados (opcional)
    const yaEsta = carrito.some((p: Paquete) => p.id === paquete.id);
    if (!yaEsta) {
        carrito.push(paquete);
        localStorage.setItem('paquetesSeleccionados', JSON.stringify(carrito));
        alert('Paquete agregado al carrito');
    } else {
        alert('Este paquete ya está en el carrito');
    }
}


  comprarAhora(paquete: Paquete): void {
      if (!this.userService.isLogged()) {
          this.router.navigate(['/login'], {
              queryParams: { returnUrl: '/catalogo' }
          });
          return;
      }

      this.checkout.getPaquete(paquete);
      this.router.navigate(['/checkout']);
  }

}