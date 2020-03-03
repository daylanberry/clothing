import { createSelector } from 'reselect'

export const selectChat = state => state.chat

export const chatHidden = createSelector(
  [selectChat],
  (chat) => chat.hidden
)