import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paquete } from '../models/paquete.model';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {
  constructor() { }

  private jsonURL = "paquetes.json";
  private http = inject(HttpClient);

  public getPaquetes(): Observable<Paquete[]> {
    console.log("peticion lista")
    return this.http.get<Paquete[]>(this.jsonURL);
  }

}
