// src/app/services/paquetes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquete } from '../models/paquete.model';

@Injectable({
    providedIn: 'root'
})
export class PaquetesService {
    private apiUrl = 'http://localhost:8080/api/paquetes';

    constructor(private http: HttpClient) {}

    obtenerPaquetes(): Observable<Paquete[]> {
        return this.http.get<Paquete[]>(this.apiUrl);
    }
    
    crearPaquete(paquete: Paquete): Observable<Paquete> {
        return this.http.post<Paquete>(this.apiUrl, paquete);
    }

    eliminarPaquete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
