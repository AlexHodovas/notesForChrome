import { PRESS_EDIT_NOTE_NAME_BTN } from "../types"

const pressEditNoteNameBtnReducer = (state = false, action) => {
  switch (action.type) {
    case PRESS_EDIT_NOTE_NAME_BTN:
      return action.value

    default:
      return state
  }
};

export default pressEditNoteNameBtnReducer