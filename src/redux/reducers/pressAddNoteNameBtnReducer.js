import { PRESS_ADD_NOTE_NAME_BTN } from "../types"

const pressAddNoteNameBtnReducer = (state = false, action) => {
  switch (action.type) {
    case PRESS_ADD_NOTE_NAME_BTN:
      return action.value

    default:
      return state
  }
}

export default pressAddNoteNameBtnReducer
