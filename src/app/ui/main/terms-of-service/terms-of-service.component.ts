import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-terms-of-service',
  standalone: true,
  imports: [],
  template: `
    <p>
      terms-of-service works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsOfServiceComponent {

}
