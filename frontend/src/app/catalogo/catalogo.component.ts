import { Component, inject, OnInit } from '@angular/core';
import { PaqueteComponent } from '../paquete/paquete.component';
import { PaquetesService } from '../services/paquetes.service';
import { Paquete } from '../models/paquete.model';

@Component({
  selector: 'app-catalogo',
  imports: [PaqueteComponent],
  template: `
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      @for (paquete of this.paquetes; track $index) {
        <app-paquete
          [id]="paquete.id"
          [nombre]="paquete.nombre"
          [precio]="paquete.precio"
          [origen]="paquete.origen"
          [destino]="paquete.destino"
        />
      } @empty {
        <b>cargando paquetes...</b>
      }
    </section>
  `,
  styles: ``,
})
export class CatalogoComponent implements OnInit {
  paquetesMock = inject(PaquetesService);
  paquetes!: Paquete[];

  ngOnInit(): void {
    this.paquetesMock.getPaquetes().subscribe((data) => {
      this.paquetes = data;
    });
  }
}
