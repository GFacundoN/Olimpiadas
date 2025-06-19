import { Injectable } from '@angular/core';
import { Paquete } from '../models/paquete.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  constructor() { }

  paquetes: Set<Paquete> = new Set<Paquete>();
  paquete!: Paquete;
  total!: number;

  actualizarTotal(): number {
    this.total = 0;
    this.paquetes.forEach(paquetes => {
      this.total += paquetes.precio;
    });
    return this.total;
  }

  setToCarrito(paquete: Paquete) { // setter
    this.paquete = paquete;
    this.paquetes.add(this.paquete);
    console.log(`Se agregó ${this.paquete.nombre} al carrito!`)
  }

  getFromCarrito(): Set<Paquete> { // getter
    console.log(this.paquetes)
    return this.paquetes
  }

  removeFromCarrito(id: number) {
    this.paquetes.forEach(item => {
      if (item.id == id) {
        this.paquetes.delete(item);
        this.total = this.actualizarTotal();
        console.log(this.total);
      }
    });
  }
}
