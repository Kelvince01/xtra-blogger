import { Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SeoService } from '@core/services';

@Component({
  selector: 'xtra-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  template: `
    <div>
      <ngx-spinner
        bdColor="rgba(0,0,0,0.2)"
        size="medium"
        color="#0049AF"
        type="ball-spin-clockwise-fade">
        <p style="font-size: 20px; color: white">Loading...</p>
      </ngx-spinner>
      <router-outlet />
    </div>
  `,
  styles: ``
})
export class AppComponent {
  title = 'Xtra Blog';

  seoService = inject(SeoService);

  constructor() {
    this.seoService.addSeoData();
  }
}
