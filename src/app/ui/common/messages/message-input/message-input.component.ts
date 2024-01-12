import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'xtra-message-input',
  standalone: true,
  imports: [],
  template: `
    <p>
      message-input works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent {
  @Output() emitMessage = new EventEmitter<unknown>();

}
