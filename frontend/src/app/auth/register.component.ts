import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    nombres: string = '';
    email: string = '';
    telefono: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(): void {
        const nuevoUsuario = {
            nombres: this.nombres,
            email: this.email,
            telefono: this.telefono,
            password: this.password
        };

        this.authService.register(nuevoUsuario).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.log(nuevoUsuario)
                this.errorMessage = err.error?.mensaje || 'Error al registrar. Intentalo de nuevo.';
                console.log(err)
            }
        });
    }
}
