import { USER_PRESS_EDIT_NOTE_NAME_BUTTON } from "../actions";

const pressEditNoteNameBtnReducer = (state = false, action) => {
  switch (action.type) {
    case USER_PRESS_EDIT_NOTE_NAME_BUTTON:
      return action.value;

    default:
      return state;
  }
};

export default pressEditNoteNameBtnReducer;