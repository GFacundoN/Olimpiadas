import { Component, OnInit, inject } from '@angular/core';
import { PaquetesService } from '../services/paquetes.service';
import { Paquete } from '../models/paquete.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: 'catalogo.component.html',
  styles: ``,
  imports: [RouterLink, CommonModule]
})
export class CatalogoComponent implements OnInit {
  private paquetesService = inject(PaquetesService);
  paquetes: Paquete[] = [];

  ngOnInit(): void {
    this.paquetesService.obtenerPaquetes().subscribe((data: Paquete[]) => {
      this.paquetes = data;
    });
  }
}
