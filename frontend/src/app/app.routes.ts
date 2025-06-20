import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PaqueteDetalleComponent } from './paquete-detalle/paquete-detalle.component';
import { ComprasComponent } from './compras/compras.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PasajerosComponent } from './checkout/pasajeros.component';
import { PagoComponent } from './checkout/pago.component';
import { ResumenComponent } from './checkout/resumen.component';
import { GraciasCompraComponent } from './checkout/gracias-compra.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { LogGuard } from './guards/log.guard';
import { AdminGuard } from './guards/admin.guard';
import { NotAdminGuard } from './guards/not-admin.guard';
import { NotLogGuard } from './guards/not-log.guard';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio',
  },
  {
    // solo los que no están logueados pueden acceder
    path: 'login',
    component: LoginComponent,
    title: 'Iniciá sesión',
    canActivate: [NotLogGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registrate',
    canActivate: [NotLogGuard]
  },
  {
    // cualquiera puede tener acceso al catalogo
    path: 'catalogo',
    component: CatalogoComponent,
    title: 'Los mejores viajes',
  },
  {
    // cualquiera puede ver el detalle del paquete
    path: 'catalogo/:id',
    component: PaqueteDetalleComponent,
    title: 'Detalles de tu viaje' // cambiar por el titulo del viaje
  },
  {
    path: 'carrito',
    component: CarritoComponent,
    title: 'Mi carrito', // cambiar por el titulo del viaje
    canActivate: [LogGuard, NotAdminGuard]
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    title: 'Listado de pendientes',
    canActivate: [LogGuard, AdminGuard]
  },
  {
    path: 'mis-compras',
    component: ComprasComponent,
    title: 'Mis compras', // cambiar por el titulo del viaje
    canActivate: [LogGuard, NotAdminGuard]
  },
  {
    // restringir acceso por URL
    path: 'checkout',
    component: CheckoutComponent,
    title: "Procesamiento de tu pago",
    children: [
      {
        path: '',
        redirectTo: 'pasajeros',
        pathMatch: 'full'
      },
      {
        path: 'pasajeros',
        component: PasajerosComponent
      },
      {
        path: 'pago',
        component: PagoComponent
      },
      {
        path: 'resumen',
        component: ResumenComponent
      },
      { 
        path: 'gracias',
         component: GraciasCompraComponent 
      }

    ],
    canActivate: [LogGuard, NotAdminGuard]
  }
];
