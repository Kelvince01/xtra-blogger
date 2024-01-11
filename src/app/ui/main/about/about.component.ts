import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-about',
  standalone: true,
  imports: [],
  template: `
    <p>
      about works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

}
