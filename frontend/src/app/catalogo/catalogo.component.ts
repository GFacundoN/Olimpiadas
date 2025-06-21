import { Component, OnInit, inject } from '@angular/core';
import { PaquetesService } from '../services/paquetes.service';
import { UserService } from '../services/user.service';
import { Paquete } from '../models/paquete.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: 'catalogo.component.html',
  styles: ``,
  imports: [RouterLink, CommonModule, FormsModule]
})
export class CatalogoComponent implements OnInit {
  private paquetesService = inject(PaquetesService);
  private userService = inject(UserService);
  paquetes: Paquete[] = [];
  esAdmin = false;
  nuevoPaquete: Partial<Paquete> = {};
  claseVueloOpciones = ['ECONOMICA', 'EJECUTIVA', 'PREMIUM'];

  ngOnInit(): void {
    this.paquetesService.obtenerPaquetes().subscribe((data: Paquete[]) => {
      this.paquetes = data;
    });
    this.esAdmin = this.userService.admin;
  }

  crearPaquete() {
    if (!this.nuevoPaquete.origen || !this.nuevoPaquete.destino || !this.nuevoPaquete.precio || !this.nuevoPaquete.claseVuelo) {
      alert('Todos los campos requeridos deben ser completados');
      return;
    }
    this.paquetesService.crearPaquete(this.nuevoPaquete as Paquete).subscribe(paquete => {
      this.paquetes.push(paquete);
      this.nuevoPaquete = {};
    });
  }

  eliminarPaquete(id: number | undefined) {
    if (!id) return;
    if (!confirm('¿Estás seguro que deseas eliminar este paquete?')) return;
      this.paquetesService.eliminarPaquete(id).subscribe({
        next: () => {
        this.paquetes = this.paquetes.filter(p => p.idPaquete !== id);
    },
    error: err => {
      alert(err.error?.message || 'No se puede eliminar el paquete. Puede estar asociado a un pedido.');
    }
  });
}
} 