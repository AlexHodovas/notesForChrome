import {
  ADD_NOTE,
  DELETE_NOTE,
  CHANGE_NOTE_NAME,
  CHANGE_NOTE_BODY,
} from "../types";

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          noteId: action.note.noteId,
          noteName: action.note.noteName,
          noteBody: action.note.noteBody
        }
      ];

    case DELETE_NOTE:
      return state.filter(note => note.noteId !== action.noteId);

    case CHANGE_NOTE_NAME:
      return state.map(note => {
        if (
          action.noteId !== note.noteId ||
          note.noteName === action.noteName
        ) {
          return note;
        }

        return {
          ...note,
          noteName: action.noteName
        };
      });

    case CHANGE_NOTE_BODY:
      return state.map(note => {
        if (
          action.noteId !== note.noteId ||
          note.noteBody === action.noteBody
        ) {
          return note;
        }

        return {
          ...note,
          noteBody: action.noteBody
        };
      });

    default:
      return state;
  }
};

export default noteReducer;
