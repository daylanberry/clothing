import ChatActionTypes from './chat.types'


export const toggleChatModal = () => ({
  type: ChatActionTypes.TOGGLE_CHAT_MODAL,
})

export const toggleHidden = () => ({
  type: ChatActionTypes.TOGGLE_HIDDEN
})