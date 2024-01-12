import { ChangeDetectionStrategy, Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { Message } from '@data/models';
import { MessagesFacade } from '@data/store/messages';
import { MessageCardComponent } from '@common-ui/messages/message-card/message-card.component';
import { MessageHeaderComponent } from '@common-ui/messages/message-header/message-header.component';
import { MessageInputComponent } from '@common-ui/messages/message-input/message-input.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { MessagesService } from '@data/services';

@Component({
  selector: 'xtra-messages',
  standalone: true,
  imports: [
    MessageCardComponent,
    MessageHeaderComponent,
    MessageInputComponent,
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  template: `
    <xtra-message-header />
    <ng-container *ngIf="messages$ | async as messages">
      <xtra-message-card
        *ngFor="let message of messages; trackBy: trackById"
        [message]="message"
        (removeMessage)="remove($event)"
        (editMessage)="edit($event)" />
    </ng-container>
    <xtra-message-input (emitMessage)="saveMessage(($event))" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent  implements OnInit {
  private readonly messagesFacade: MessagesFacade = inject(MessagesFacade);

  messages$: Observable<Message[]> = of([]);

  trackById: TrackByFunction<Message> = (index: number, { id }: Message): number => Number(id);

  private readonly messagesService: MessagesService = inject(MessagesService);

  saveMessage(event?: any): void {
    const message: Message = { id: '', publishDate: new Date(), content: '' };
    this.messagesFacade.addMessage(message);
  }

  remove(id: number) {
    // send removal request to data managing service
    this.messagesService.removeMessage(id);
  }

  edit(message: Message) {
    // sen edit request to data managing service
    this.messagesService.updateMessage(message);
  }

  ngOnInit(): void {
    this.saveMessage();
    this.messages$ = this.messagesService.messages$;
  }
}
