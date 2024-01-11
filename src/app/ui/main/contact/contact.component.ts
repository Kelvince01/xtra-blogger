import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-contact',
  standalone: true,
  imports: [],
  template: `
    <p>
      contact works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {

}
