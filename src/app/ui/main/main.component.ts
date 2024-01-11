import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@main-ui/partials/navbar/navbar.component';

@Component({
  selector: 'xtra-main',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <section class="container mx-auto px-5">
      <xtra-navbar></xtra-navbar>
      <router-outlet></router-outlet>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MainComponent {}
