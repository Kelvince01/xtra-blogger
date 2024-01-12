import { createAction, props } from '@ngrx/store';
import { Message } from '@data/models';

export const messagesKey = '[Messages]';

export const addMessage = createAction(
  `${messagesKey} Add Message`,
  props<{ message: Message }>()
);

export const deleteMessage = createAction(
  `${messagesKey} Delete Message`,
  props<{ id: string }>()
);

export const deleteMessageSuccess = createAction(
  `${messagesKey} Delete Message Success`
);

export const deleteMessageError = createAction(
  `${messagesKey} Delete Message Error`
);
