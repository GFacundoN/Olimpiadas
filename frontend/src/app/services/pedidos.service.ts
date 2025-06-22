import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private http = inject(HttpClient);
  private apiURL = 'http://localhost:8080/api/pedidos';

  crearPedido(idPaquete: number, idUsuario: number, totalFinal: number): Observable<any> {
    const body = { idPaquete, idUsuario, totalFinal };
    return this.http.post(this.apiURL, body);
  }

  verMisPedidos(idUsuario: number): Observable<any[]> {
    const params = { idUsuario };
    return this.http.get<any[]>(`http://localhost:8080/api/pedidos/mis-pedidos`, { params });
  }

  listarTodosLosPedidos(idUsuario: number): Observable<any[]> {
    const params = { idUsuario };
    return this.http.get<any[]>(`http://localhost:8080/api/admin/pedidos`, { params });
  }

  entregarPedido(id: number): Observable<any> {
    return this.http.patch<any>(`http://localhost:8080/api/admin/pedidos/${id}/entregar`, {});
  }

  anularPedido(id: number): Observable<any> {
    return this.http.patch<any>(`http://localhost:8080/api/admin/pedidos/${id}/anular`, {});
  }
}
