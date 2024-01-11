import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-footer',
  standalone: true,
  imports: [],
  template: `
    <p>
      footer works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}
