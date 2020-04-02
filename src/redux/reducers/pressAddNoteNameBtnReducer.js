import { USER_PRESS_ADD_NOTE_NAME_BUTTON } from "../actions";

const pressAddNoteNameBtnReducer = (state = false, action) => {
  switch (action.type) {
    case USER_PRESS_ADD_NOTE_NAME_BUTTON:
      return action.value;

    default:
      return state;
  }
};

export default pressAddNoteNameBtnReducer;
