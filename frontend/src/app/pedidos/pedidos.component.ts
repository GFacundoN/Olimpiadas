import { Component, OnInit, inject } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  templateUrl: './pedidos.component.html',
  imports: [CommonModule, HttpClientModule],
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];
  private pedidosService = inject(PedidosService);
  private userService = inject(UserService);
  esAdmin = false;

  ngOnInit(): void {
    this.esAdmin = this.userService.admin;
    if (this.esAdmin && this.userService.userId) {
      this.pedidosService.listarTodosLosPedidos(this.userService.userId).subscribe(data => {
        this.pedidos = data;
      });
    }
  }

  anularPedido(id: number) {
    if (!confirm('¿Deseas anular este pedido?')) return;
    this.pedidosService.anularPedido(id).subscribe(updated => {
      this.actualizarEstadoPedido(updated);
    });
  }

  entregarPedido(id: number) {
    if (!confirm('¿Deseas confirmar la entrega de este pedido?')) return;
    this.pedidosService.entregarPedido(id).subscribe(updated => {
      this.actualizarEstadoPedido(updated);
    });
  }

  private actualizarEstadoPedido(updated: any) {
    this.pedidosService.listarTodosLosPedidos(this.userService.userId!).subscribe(data => {
      this.pedidos = data;
  });
  }
}
