import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-privacy-policy',
  standalone: true,
  imports: [],
  template: `
    <p>
      privacy-policy works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent {

}
