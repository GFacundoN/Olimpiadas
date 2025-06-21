import { Injectable } from '@angular/core';
import { Paquete } from '../models/paquete.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  paquetes: Set<Paquete> = new Set<Paquete>();
  total: number = 0;

  private getUserId(): number | null {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return null;

    try {
      return JSON.parse(usuario).id;
    } catch {
      return null;
    }
  }

  private getStorageKey(): string {
    const userId = this.getUserId();
    return userId !== null ? `carrito_${userId}` : 'carrito_anonimo';
  }

  private guardarEnStorage() {
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(Array.from(this.paquetes)));
  }

  private cargarDesdeStorage() {
    const key = this.getStorageKey();
    const data = localStorage.getItem(key);
    this.paquetes = data ? new Set<Paquete>(JSON.parse(data)) : new Set<Paquete>();
  }

  constructor() {
    this.cargarDesdeStorage();
    this.total = this.actualizarTotal();
  }

  actualizarTotal(): number {
    this.total = 0;
    this.paquetes.forEach(p => this.total += p.precio);
    return this.total;
  }

  setToCarrito(paquete: Paquete): void {
    this.paquetes.add(paquete);
    this.guardarEnStorage();
    this.total = this.actualizarTotal();
    console.log(`Se agregó ${paquete.destino} al carrito!`);
  }

  getFromCarrito(): Set<Paquete> {
    this.cargarDesdeStorage(); // Siempre leer el más reciente
    return this.paquetes;
  }

  removeFromCarrito(id: number): void {
    this.paquetes.forEach(item => {
      if (item.idPaquete === id) {
        this.paquetes.delete(item);
      }
    });
    this.guardarEnStorage();
    this.total = this.actualizarTotal();
    console.log(`Nuevo total: ${this.total}`);
  }

  limpiarCarrito(): void {
    this.paquetes.clear();
    this.guardarEnStorage();
    this.total = 0;
  }
}
