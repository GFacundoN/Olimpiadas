import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: ``
})
export class CheckoutComponent implements OnDestroy {
  checkoutService = inject(CheckoutService);

  ngOnDestroy(): void { // seteo a undefined al salir del checkout
    this.checkoutService.resetCheckout();
  }
}
