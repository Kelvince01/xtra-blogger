import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'xtra-admin',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section class="container mx-auto px-5">
      <router-outlet />
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {}
