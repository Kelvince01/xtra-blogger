import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Message } from '@data/models';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private readonly http: HttpClient = inject(HttpClient);
  messages$: Observable<Message[]> = of([]);

  deleteMessage(id: string): Observable<void> {
    return this.http.delete<void>(`/${id}`);
  }

  removeMessage(id: number) {

  }

  updateMessage(message: Message) {

  }
}
