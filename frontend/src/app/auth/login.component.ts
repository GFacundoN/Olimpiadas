import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, FormsModule, CommonModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    email = '';
    password = '';
    errorMessage: string | null = null;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {}
    onSubmit() {
        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (res) => {
               this.userService.login({
                    id: res.idUsuario, // ← CAMBIO IMPORTANTE
                    email: res.email,
                    admin: res.admin
                });

                this.router.navigate(['/']);
            },
            error: (err) => {
                this.errorMessage = err?.message ?? 'Error desconocido';
            }
        });
    }


}
