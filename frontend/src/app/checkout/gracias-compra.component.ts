import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gracias-compra',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <h1 class="text-3xl font-bold mb-4 text-green-600">¡Gracias por tu compra!</h1>
        <p class="text-lg text-gray-700 mb-8">Tu pedido ha sido procesado exitosamente.</p>
        <button
            (click)="volverInicio()"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md transition"
        >
            Volver al inicio
        </button>
    </section>
    `
})
export class GraciasCompraComponent {
    constructor(private router: Router) {}

    volverInicio() {
        this.router.navigate(['/']);
    }
}
