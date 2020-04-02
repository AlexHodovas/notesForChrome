import { IS_DIALOG_FOR_NOTE_EDITING_OPENED } from "../actions";

const isDialogForNoteEditingOpenedReducer = (state = false, action) => {
  switch (action.type) {
    case IS_DIALOG_FOR_NOTE_EDITING_OPENED:
      return action.value;

    default:
      return state;
  }
};

export default isDialogForNoteEditingOpenedReducer;
