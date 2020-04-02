// folders types
export const HIDE_FOLDERS = "HIDE_FOLDERS";
export const ADD_FOLDER = "ADD_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const USER_PRESS_ADD_FOLDER_BUTTON = "USER_PRESS_ADD_FOLDER_BUTTON";
export const USER_PRESS_EDIT_FOLDER_NAME_BUTTON =
  "USER_PRESS_EDIT_FOLDER_NAME_BUTTON";
export const CHANGE_FOLDER_NAME = "CHANGE_FOLDER_NAME";
export const SAVE_FOLDER_ID_FOR_EDITING = "SAVE_FOLDER_ID_FOR_EDITING";

// notes types
export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const USER_PRESS_ADD_NOTE_NAME_BUTTON =
  "USER_PRESS_ADD_NOTE_NAME_BUTTON";
export const USER_PRESS_EDIT_NOTE_NAME_BUTTON =
  "USER_PRESS_EDIT_NOTE_NAME_BUTTON";
export const CHANGE_NOTE_NAME = "CHANGE_NOTE_NAME";
export const SAVE_NOTE_ID_FOR_EDITING = "SAVE_NOTE_ID_FOR_EDITING";
export const CHANGE_NOTE_BODY = "CHANGE_NOTE_BODY";

// common types
export const SAVE_ITEM_ID_FOR_DELETING = "SAVE_ITEM_ID_FOR_DELETING";
export const IS_DIALOG_FOR_NOTE_EDITING_OPENED =
  "IS_DIALOG_FOR_NOTE_EDITING_OPENED";
export const CHANGE_NOTE_BODY_IN_NOTES_IN_THIS_FOLDER =
  "CHANGE_NOTE_BODY_IN_NOTES_IN_THIS_FOLDER";
export const CHANGE_NOTES_IN_THIS_FOLDER = "CHANGE_NOTES_IN_THIS_FOLDER";
export const CHANGE_NOTE_NAME_IN_NOTES_IN_THIS_FOLDER =
  "CHANGE_NOTE_NAME_IN_NOTES_IN_THIS_FOLDER";
export const DELETE_NOTE_IN_NOTES_IN_THIS_FOLDER =
  "DELETE_NOTE_IN_NOTES_IN_THIS_FOLDER";
export const DELETE_NOTE_IN_NOTES_IN_THIS_FOLDER_ON_DRAG_END =
  "DELETE_NOTE_IN_NOTES_IN_THIS_FOLDER_ON_DRAG_END";
export const DELETE_SELECTED_ITEM = "DELETE_SELECTED_ITEM";
export const UPDATE_FOLDER_ALL_NOTES_WHEN_DELETING_ANOTHER_FOLDER =
  "UPDATE_FOLDER_ALL_NOTES_WHEN_DELETING_ANOTHER_FOLDER";

// folders actions
export const hideFolders = () => ({ type: HIDE_FOLDERS });
export const addFolder = folder => ({ type: ADD_FOLDER, folder });
export const deleteFolder = folderId => ({ type: DELETE_FOLDER, folderId });
export const userPressAddFolderButton = value => ({
  type: USER_PRESS_ADD_FOLDER_BUTTON,
  value
});
export const userPressEditFolderNameButton = value => ({
  type: USER_PRESS_EDIT_FOLDER_NAME_BUTTON,
  value
});
export const changeFolderName = (folderName, folderId) => ({
  type: CHANGE_FOLDER_NAME,
  folderName,
  folderId
});
export const saveFolderIdForEditing = folderId => ({
  type: SAVE_FOLDER_ID_FOR_EDITING,
  folderId
});
export const changeNotesInThisFolder = (folderId, note) => ({
  type: CHANGE_NOTES_IN_THIS_FOLDER,
  folderId,
  note
});

// notes actions
export const addNote = note => ({ type: ADD_NOTE, note });
export const userPressAddNoteNameButton = value => ({
  type: USER_PRESS_ADD_NOTE_NAME_BUTTON,
  value
});
export const userPressEditNoteNameButton = value => ({
  type: USER_PRESS_EDIT_NOTE_NAME_BUTTON,
  value
});
export const changeNoteName = (noteName, noteId) => ({
  type: CHANGE_NOTE_NAME,
  noteName,
  noteId
});
export const saveNoteIdForEditing = noteId => ({
  type: SAVE_NOTE_ID_FOR_EDITING,
  noteId
});
export const deleteNote = noteId => ({ type: DELETE_NOTE, noteId });
export const changeNoteBody = (noteBody, noteId) => ({
  type: CHANGE_NOTE_BODY,
  noteBody,
  noteId
});

// common actions
export const saveItemIdForDeleting = itemId => ({
  type: SAVE_ITEM_ID_FOR_DELETING,
  itemId
});
export const userPressDoubleClickForNoteBodyEditing = value => ({
  type: IS_DIALOG_FOR_NOTE_EDITING_OPENED,
  value
});
export const changeNoteBodyInNotesInThisFolder = (noteBody, noteId) => ({
  type: CHANGE_NOTE_BODY_IN_NOTES_IN_THIS_FOLDER,
  noteBody,
  noteId
});
export const changeNoteNameInNotesInThisFolder = (noteName, noteId) => ({
  type: CHANGE_NOTE_NAME_IN_NOTES_IN_THIS_FOLDER,
  noteName,
  noteId
});
export const deleteNoteInNotesInThisFolder = noteId => ({
  type: DELETE_NOTE_IN_NOTES_IN_THIS_FOLDER,
  noteId
});
export const deleteNoteInNotesInThisFolderOnDragEnd = (folderId, noteId) => ({
  type: DELETE_NOTE_IN_NOTES_IN_THIS_FOLDER_ON_DRAG_END,
  folderId,
  noteId
});
export const deleteSelectedItem = selectedItemId => ({
  type: DELETE_SELECTED_ITEM,
  selectedItemId
});
export const updateFolderAllNotesWhenDeletingAnotherFolder = (
  arrayOfNotesIdThatWillBeDeleting,
  folderAllNotesId
) => ({
  type: UPDATE_FOLDER_ALL_NOTES_WHEN_DELETING_ANOTHER_FOLDER,
  arrayOfNotesIdThatWillBeDeleting,
  folderAllNotesId
});
