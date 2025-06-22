import { Injectable } from '@angular/core';
import { Paquete } from '../models/paquete.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  paquetes!: Set<Paquete> | undefined;
  paquete!: Paquete | undefined;
  // "| undefined" determina que se puede establecerlo como "vacio"

  resetCheckout() { // cuando el user sale del checkout, se setean ambos a undefined
    this.paquete = undefined;
    this.paquetes = undefined;
  }

  // para compras individuales
  getPaquete(paquete: Paquete) {
    this.paquete = paquete;
    console.log(this.paquete);
  }

  showPaquete(): Paquete | undefined {
    return this.paquete;
  }

  // para compras desde el carrito
  getPaquetes(paquetes: Set<Paquete>) {
    this.paquetes = paquetes;
    console.log(this.paquetes);
  }

  showPaquetes(): Set<Paquete> | undefined {
    return this.paquetes;
  }

}
