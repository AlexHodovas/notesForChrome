import { SAVE_NOTE_ID } from "../types";

const saveNoteIdForEditingReducer = (state = '', action) => {
  switch (action.type) {
    case SAVE_NOTE_ID:
      return action.noteId;

    default:
      return state;
  }
};

export default saveNoteIdForEditingReducer;