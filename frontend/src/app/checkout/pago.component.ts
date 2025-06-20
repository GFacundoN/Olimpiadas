import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-pago',
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: 'pago.component.html',
    styles: ``
})
export class PagoComponent {
    metodoPago: string = '';

    constructor(private router: Router) {}

    continuar(): void {
        if (this.metodoPago) {
            localStorage.setItem('metodoPago', this.metodoPago);
            this.router.navigate(['/checkout/resumen']);
        }
    }
}
