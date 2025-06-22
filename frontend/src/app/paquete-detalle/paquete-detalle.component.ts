import { Component, inject, OnInit } from '@angular/core';
import { Paquete } from '../models/paquete.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaquetesService } from '../services/paquetes.service';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { CarritoService } from '../services/carrito.service';
import { CheckoutService } from '../services/checkout.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-paquete-detalle',
    standalone: true,
    imports: [CommonModule, CurrencyPipe],
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
    carritoAgregado: boolean = false;

    constructor(
        private carritoService: CarritoService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.service.obtenerPaquetes().subscribe((data) => {
            this.paquetes = data;
        });

        setTimeout(() => {
            this.rutaActiva.params.subscribe((params) => {
                this.paquete = this.paquetes.find(
                    (paquete) => paquete.idPaquete == +params['id']
                );
            });
        }, 500);
    }

    agregarAlCarrito(paquete: Paquete): void {
        if (!this.userService.isLogged()) {
            this.router.navigate(['/login'], {
                queryParams: { returnUrl: '/catalogo' },
            });
            return;
        }

        this.carritoService.setToCarrito(paquete);

        const carritoGuardado = localStorage.getItem('paquetesSeleccionados');
        const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

        const yaEsta = carrito.some(
            (p: Paquete) => p.idPaquete === paquete.idPaquete
        );

        if (!yaEsta) {
            carrito.push(paquete);
            localStorage.setItem('paquetesSeleccionados', JSON.stringify(carrito));
            this.carritoAgregado = true;

            setTimeout(() => {
                this.carritoAgregado = false;
            }, 3000);
        } else {
            alert('Este paquete ya está en el carrito');
        }
    }

    comprarAhora(paquete: Paquete): void {
        if (!this.userService.isLogged()) {
            this.router.navigate(['/login'], {
                queryParams: { returnUrl: '/catalogo' },
            });
            return;
        }

        this.checkout.getPaquete(paquete);
        this.router.navigate(['/checkout']);
    }
}
