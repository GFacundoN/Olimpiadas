import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    logged = false;
    admin = false;
    email: string | null = null;
    userId: number | null = null;

    // Lista de emails administradores (pueden agregar más)
    private adminEmails = ['jefe@empresa.com'];

    constructor() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            this.logged = true;
            this.email = parsed.email;
            this.userId = parsed.id;
            this.admin = parsed.admin ?? this.adminEmails.includes(parsed.email);
        }
    }

    login(userData: { id: number; email: string }) {
        this.logged = true;
        this.email = userData.email;
        this.userId = userData.id;

        // Detectar admin según email
        this.admin = this.adminEmails.includes(userData.email);

        // Guardar el usuario con flag admin en localStorage
        localStorage.setItem('user', JSON.stringify({ ...userData, admin: this.admin }));
    }

    logout() {
        this.logged = false;
        this.admin = false;
        this.email = null;
        this.userId = null;

        localStorage.removeItem('user');
    }

    isAdmin(): boolean {
        return this.admin;
    }

    isLogged(): boolean {
        return this.logged;
    }
}
