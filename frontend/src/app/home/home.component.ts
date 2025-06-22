import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PaquetesService } from '../services/paquetes.service';
import { Paquete } from '../models/paquete.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    imports: [FormsModule, CommonModule, RouterLink],
    styles: []
})
export class HomeComponent implements OnInit {
    paquetes: Paquete[] = [];

    destinos: string[] = [];
    personas: number[] = [];
    fechas: string[] = [];

    filtro = {
        destino: '',
        personas: '',
        fecha: ''
    };

    constructor(private paquetesService: PaquetesService, private router: Router) {}

    ngOnInit(): void {
        this.paquetesService.obtenerPaquetes().subscribe(paquetes => {
            this.paquetes = paquetes;

            this.destinos = [...new Set(paquetes.map(p => p.destino))];
            this.personas = [...new Set(paquetes.map(p => p.cantPersonas))];
            this.fechas = [...new Set(paquetes.map(p => p.fechaInicio))];
        });
    }

    buscar() {
        const queryParams: any = {};
        if (this.filtro.destino) queryParams.destino = this.filtro.destino;
        if (this.filtro.personas) queryParams.personas = this.filtro.personas;
        if (this.filtro.fecha) queryParams.fecha = this.filtro.fecha;

        this.router.navigate(['/catalogo'], { queryParams });
    }
}
