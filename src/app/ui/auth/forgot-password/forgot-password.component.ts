import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-forgot-password',
  standalone: true,
  imports: [],
  template: `
    <p>
      forgot-password works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {

}
