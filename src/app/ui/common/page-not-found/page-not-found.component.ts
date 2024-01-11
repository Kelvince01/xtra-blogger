import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-page-not-found',
  standalone: true,
  imports: [],
  template: `
    <p>
      page-not-found works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {

}
