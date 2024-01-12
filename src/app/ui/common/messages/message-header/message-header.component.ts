import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-message-header',
  standalone: true,
  imports: [],
  template: `
    <p>
      message-header works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageHeaderComponent {

}
