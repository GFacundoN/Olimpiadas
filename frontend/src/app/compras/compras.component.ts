import { Component, OnInit, inject } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-6 w-3/4 m-auto">
      <h2 class="text-2xl font-bold mb-4">Mis compras</h2>

      <div *ngIf="pedidos.length === 0" class="text-gray-500">
        No tenés compras registradas aún.
      </div>

      <div *ngFor="let pedido of pedidos" class="bg-white p-4 rounded-xl shadow-md mb-4">
        <h3 class="text-xl font-semibold">{{ pedido.destino }}</h3>
        <p><b>Fecha:</b> {{ pedido.fechaPedido | date:'short' }}</p>
        <p><b>Precio:</b> {{ pedido.totalFinal | currency:'ARS':'symbol' }}</p>
        <p><b>Estado:</b> 
          <span [ngClass]="{
            'text-yellow-600': pedido.estado === 'Pendiente',
            'text-green-600': pedido.estado === 'Completado',
            'text-red-600': pedido.estado === 'Anulado'
          }">
            {{ pedido.estado }}
          </span>
        </p>
      </div>
    </section>
  `,
  styles: []
})
export class ComprasComponent implements OnInit {
  pedidos: any[] = [];
  pedidoService = inject(PedidosService);
  userService = inject(UserService);

  ngOnInit(): void {
    const idUsuario = this.userService.getUserId();
    if (!idUsuario) return;

    this.pedidoService.verMisPedidos(idUsuario).subscribe({
      next: (data) => this.pedidos = data,
      error: (err) => console.error('Error al cargar pedidos:', err)
    });
  }
}
