import { SAVE_NOTE_ID_FOR_EDITING } from "../actions";

const saveNoteIdForEditingReducer = (state = '', action) => {
  switch (action.type) {
    case SAVE_NOTE_ID_FOR_EDITING:
      return action.noteId;

    default:
      return state;
  }
};

export default saveNoteIdForEditingReducer;