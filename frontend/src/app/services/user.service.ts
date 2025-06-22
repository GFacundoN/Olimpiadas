import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    logged = false;
    admin = false;
    email: string | null = null;
    userId: number | null = null;

    private adminEmails = ['jefe@empresa.com'];

    constructor() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            this.logged = true;
            this.email = parsed.email;
            this.userId = parsed.idUsuario;
            this.admin = parsed.admin ?? this.adminEmails.includes(parsed.email);
        }
    }

    login(userData: { id: number; email: string; admin?: boolean }) {
        this.logged = true;
        this.email = userData.email;
        this.userId = userData.id;
        this.admin = userData.admin ?? this.adminEmails.includes(userData.email);

        const user = {
            idUsuario: userData.id,
            email: userData.email,
            admin: this.admin
        };

        localStorage.setItem('user', JSON.stringify(user));
    }

    getUserId(): number | null {
        const data = localStorage.getItem('user');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                return parsed.idUsuario ?? null;
            } catch {
                return null;
            }
        }
        return null;
    }


    logout(): void {
        const data = localStorage.getItem('user');
        
        if (data) {
            const { idUsuario } = JSON.parse(data);

            // Eliminar datos ligados a un usuario con login
            localStorage.removeItem(`carrito_${idUsuario}`);
            localStorage.removeItem(`paquetesSeleccionados_${idUsuario}`);
            localStorage.removeItem(`pasajero_${idUsuario}`);
            localStorage.removeItem(`metodoPago_${idUsuario}`);
        }

        // También eliminar datos genéricos/anteriores (usuario anónimo)
        localStorage.removeItem('carrito_anonimo');
        localStorage.removeItem('paquetesSeleccionados');
        localStorage.removeItem('pasajero');    
        localStorage.removeItem('metodoPago');
        localStorage.removeItem('user');

        // Limpiar el estado local
        this.logged = false;
        this.email = null;
        this.userId = null;
        this.admin = false;
    }



    isAdmin(): boolean {
        return this.admin;
    }

    isLogged(): boolean {
        return this.logged;
    }
}
