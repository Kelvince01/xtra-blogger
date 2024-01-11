import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-otp-verify',
  standalone: true,
  imports: [],
  template: `
    <p>
      otp-verify works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpVerifyComponent {

}
