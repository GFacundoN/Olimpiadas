import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-resumen',
    templateUrl: 'resumen.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class ResumenComponent implements OnInit {
    paquetes: { nombre: string; precio: number }[] = [];
    total: number = 0;

    pasajero: {
        nombre: string;
        apellido: string;
        tipoDocumento: string;
        documento: string;
        residencia: string;
        nacionalidad: string;
    } = {
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        documento: '',
        residencia: '',
        nacionalidad: '',
    };

    metodoPago: string = '';

    // Inyectar Router acá:
    constructor(private router: Router) {}

    ngOnInit(): void {
        const paquetesGuardados = localStorage.getItem('paquetesSeleccionados');
        const pasajeroGuardado = localStorage.getItem('pasajero');
        const metodoPagoGuardado = localStorage.getItem('metodoPago');

        if (paquetesGuardados) {
            this.paquetes = JSON.parse(paquetesGuardados);
            this.total = this.paquetes.reduce((sum, p) => sum + p.precio, 0);
        }

        if (pasajeroGuardado) {
            this.pasajero = JSON.parse(pasajeroGuardado);
        }

        if (metodoPagoGuardado) {
            this.metodoPago = this.formatearMetodoPago(metodoPagoGuardado);
        }
    }

    formatearMetodoPago(valor: string): string {
        switch (valor) {
            case 'tarjeta':
                return 'Tarjeta de crédito/débito';
            case 'mercado_pago':
                return 'Mercado Pago';
            case 'transferencia':
                return 'Transferencia Bancaria';
            default:
                return 'No especificado';
        }
    }

    confirmarCompra(): void {
        console.log('Compra confirmada!');
        console.log('Paquetes:', this.paquetes);
        console.log('Pasajero:', this.pasajero);
        console.log('Método de pago:', this.metodoPago);

        // Redirigir a la pantalla de gracias:
        this.router.navigate(['/checkout/gracias']);
    }
}
