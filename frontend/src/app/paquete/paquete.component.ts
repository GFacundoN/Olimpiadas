// src/app/models/paquete/paquete.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaquetesService } from '../services/paquetes.service';
import { UserService } from '../services/user.service';
import { Paquete } from '../models/paquete.model';

@Component({
    selector: 'app-paquete',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './paquete.component.html'
})
export class PaqueteComponent implements OnInit {
    paquetes: Paquete[] = [];
    esAdmin = false;

    constructor(private paquetesService: PaquetesService, private userService: UserService) {}

    ngOnInit(): void {
        this.paquetesService.obtenerPaquetes().subscribe({
            next: (data) => this.paquetes = data,
            error: (err) => console.error('Error al cargar paquetes:', err)
        });

        this.esAdmin = this.userService.admin;
    }
}
