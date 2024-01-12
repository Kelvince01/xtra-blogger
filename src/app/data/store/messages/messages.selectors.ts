import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '@data/store';
import { MessagesState } from '@data/store/messages/messages.state';
import { Message } from '@data/models';

export const selectMessagesFeature: MemoizedSelector<AppState, MessagesState> =
  createFeatureSelector<MessagesState>('messages');

export const selectMessages: MemoizedSelector<AppState, Message[]> =
  createSelector(
    selectMessagesFeature,
    ({ entities }: MessagesState): Message[] =>
      Object.values(entities) as Message[]
  );
