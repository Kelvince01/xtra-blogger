import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { deleteMessage, deleteMessageError, deleteMessageSuccess } from './messages.actions';
import { catchError, map, mergeMap } from 'rxjs';
import { MessagesService } from '@data/services';

export const deleteMessage$ = createEffect(
  (actions$: Actions = inject(Actions), messagesService: MessagesService = inject(MessagesService)) => {
    return actions$.pipe(
      ofType(deleteMessage),
      mergeMap(({ id }) =>
          messagesService.deleteMessage(id).pipe(
            map(() => deleteMessageSuccess()),
            catchError(() => [deleteMessageError()])
          )
      )
    );
  },
  { functional: true }
);
