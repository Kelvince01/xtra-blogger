import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Message } from '@data/models';

@Component({
  selector: 'xtra-message-card',
  standalone: true,
  imports: [DatePipe, NgClass],
  template: `
    <span [ngClass]="{ 'is-empty': isEmpty }">{{ message.content }}</span>
    <div>
      <span>{{ message.publishDate | date : 'hh:mm:ss a' }}</span>
      <i (click)="remove(message.id)">delete</i>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageCardComponent implements OnChanges {
  @Input({ required: true }) message!: Message;

  @Output() removeMessage: EventEmitter<number> = new EventEmitter<number>();
  @Output() editMessage: EventEmitter<Message> = new EventEmitter<Message>();

  isEmpty = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.message) {
      const { currentValue } = changes.message;
      this.isEmpty = !currentValue.content.length;
    }
  }

  remove(id: string): void {
    this.removeMessage.emit(Number(id));
  }

  edit(content: string): void {
    this.editMessage.emit({ ...this.message, content });
  }
}
