import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pasajeros',
  imports: [RouterLink],
  template: `
    <h4>Datos de los pasajeros</h4> <!-- la app tiene que recibir la cantidad de pasajeros y pedirlos con un @for -->

    <form class="flex flex-col gap-2 [&>input]:border [&>select]:border [&>input]:rounded [&>select]:rounded">
      <input type="text" name="nombre" id="nombre" placeholder="Nombre">
      <input type="text" name="apellido" id="apellido" placeholder="Apellido">

      <label>Tipo y N° de documento</label>
      <select name="tipo" id="tipo">
        <option value="dni">DNI</option>
        <option value="pasaporte">Pasaporte</option>
      </select>

      <label for="residencia">Residencia</label>
      <select name="residencia" id="residencia"></select>
      <label for="nacionalidad">Nacionalidad</label>
      <select name="nacionalidad" id="nacionalidad"></select>
    </form>

    <button class="rounded-2xl p-3 cursor-pointer border font-bold text-black bg-white" routerLink="../pago">Continuar</button>
  `,
  styles: ``
})
export class PasajerosComponent {

}
