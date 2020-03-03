import Redux from 'react-redux'
import ChatActionsTypes from './chat.types'

const INITIAL_STATE = {
  hidden: true
}


const chatReducer = (state=INITIAL_STATE, action) => {

  switch(action.type) {
    case ChatActionsTypes.TOGGLE_CHAT_MODAL:
      return {
        ...state,
        hidden: !state.hidden
      }

    case ChatActionsTypes.TOGGLE_HIDDEN:
      return {
        ...state,
        hidden: true
      }

    default:
      return state
  }


}

export default chatReducer