import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../services/pedidos.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-resumen',
    templateUrl: 'resumen.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class ResumenComponent implements OnInit {
    paquetes: { idPaquete: number; destino: string; precio: number }[] = [];
    total: number = 0;

    pasajero = {
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        documento: '',
        residencia: '',
        nacionalidad: '',
    };

    metodoPago: string = '';

    pedidoService = inject(PedidosService);
    userService = inject(UserService);
    router = inject(Router);

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
        const idUsuario = this.userService.getUserId(); // ✅ forma segura
        const idPaquete = this.paquetes[0]?.idPaquete;

        if (!idUsuario || !idPaquete) {
            alert('Faltan datos del usuario o del paquete.');
            return;
        }

        this.pedidoService.crearPedido(idPaquete, idUsuario, this.total).subscribe({
            next: () => {
                console.log('Pedido creado con éxito');
                localStorage.removeItem('paquetesSeleccionados');
                this.router.navigate(['/checkout/gracias']);
            },
            error: (err) => {
                console.error('Error al crear el pedido:', err);
                alert('No se pudo procesar el pedido');
            }
        });
    }
}
