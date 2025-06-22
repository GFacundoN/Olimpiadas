import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: 'item.component.html',
  styles: ``
})
export class ItemComponent {
  @Input() id!: number;
  @Input() nombre!: string;
  @Input() precio!: number;
  
  // evento destinado a la actualizacion del total en componente padre, el carrito
  @Output() nuevoTotal = new EventEmitter<number>();
  @Output() eliminado = new EventEmitter<number>();

  carritoService = inject(CarritoService);

  updateTotal() {
    this.carritoService.removeFromCarrito(this.id);
    this.nuevoTotal.emit(this.precio); 
    this.eliminado.emit(this.id); 
  }
}
