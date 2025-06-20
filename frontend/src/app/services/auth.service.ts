import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface RegisterRequest {
    nombres: string;
    email: string;
    telefono: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    id: number;
    email: string;
    admin: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) {}

    // POST /api/auth/login
    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
            .pipe(catchError(this.handleError));
    }

    // POST /api/auth/register
    register(credentials: RegisterRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, credentials)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let msg = 'Ocurrió un error inesperado.';
        if (error.error && typeof error.error === 'string') {
            msg = error.error;
        }
        return throwError(() => new Error(msg));
    }
}
