import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-pasajeros',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: 'pasajeros.component.html',
    styles: ``
})
export class PasajerosComponent {
    constructor(private router: Router) {}

    guardarPasajero(form: NgForm): void {
        if (form.valid) {
            const pasajero = {
                nombre: form.value.nombre,
                apellido: form.value.apellido,
                tipoDocumento: form.value.tipo,
                documento: form.value.documento,
                residencia: form.value.residencia,
                nacionalidad: form.value.nacionalidad
            };

            localStorage.setItem('pasajero', JSON.stringify(pasajero));
            this.router.navigate(['/checkout/pago']);
        }
    }
}
