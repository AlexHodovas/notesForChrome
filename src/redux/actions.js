import {
  HIDE_FOLDERS,
  ADD_FOLDER,
  DELETE_FOLDER,
  PRESS_ADD_FOLDER_BTN,
  PRESS_EDIT_FOLDER_NAME_BTN,
  CHANGE_FOLDER_NAME,
  SAVE_FOLDER_ID,
  ADD_NOTE,
  DELETE_NOTE,
  PRESS_ADD_NOTE_NAME_BTN,
  PRESS_EDIT_NOTE_NAME_BTN,
  SAVE_NOTE_ID,
  SAVE_SELECTED_ITEM_ID,
  DELETE_SELECTED_ITEM,
  IS_DIALOG_OPENED,
  UPDATE_FOLDER_ALL,
  CHANGE_NOTE_BODY,
  CHANGE_NOTE_NAME,
  DELETE_NOTE_ON_DRAG_END,
} from "./types";

// folders actions
export const hideFolders = () => ({ type: HIDE_FOLDERS });
export const addFolder = (folder) => ({ type: ADD_FOLDER, folder });
export const deleteFolder = (folderId) => ({ type: DELETE_FOLDER, folderId });
export const pressAddFolderBtn = (value) => ({
  type: PRESS_ADD_FOLDER_BTN,
  value,
});
export const pressEditFolderNameBtn = (value) => ({
  type: PRESS_EDIT_FOLDER_NAME_BTN,
  value,
});
export const changeFolderName = (folderName, folderId) => ({
  type: CHANGE_FOLDER_NAME,
  folderName,
  folderId,
});
export const saveFolderId = (folderId) => ({
  type: SAVE_FOLDER_ID,
  folderId,
});

// notes actions
export const addNote = (folderId, note) => ({
  type: ADD_NOTE,
  folderId,
  note,
});
export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  noteId,
});
export const changeNoteBody = (noteBody, noteId) => ({
  type: CHANGE_NOTE_BODY,
  noteBody,
  noteId,
});
export const changeNoteName = (noteName, noteId) => ({
  type: CHANGE_NOTE_NAME,
  noteName,
  noteId,
});
export const pressAddNoteNameBtn = (value) => ({
  type: PRESS_ADD_NOTE_NAME_BTN,
  value,
});
export const pressEditNoteNameBtn = (value) => ({
  type: PRESS_EDIT_NOTE_NAME_BTN,
  value,
});
export const saveNoteId = (noteId) => ({
  type: SAVE_NOTE_ID,
  noteId,
});

// common actions
export const saveSelectedItemId = (itemId) => ({
  type: SAVE_SELECTED_ITEM_ID,
  itemId,
});
export const openDialog = (value) => ({
  type: IS_DIALOG_OPENED,
  value,
});
export const deleteNoteOnDragEnd = (folderId, noteId) => ({
  type: DELETE_NOTE_ON_DRAG_END,
  folderId,
  noteId,
});
export const deleteSelectedItem = (selectedItemId) => ({
  type: DELETE_SELECTED_ITEM,
  selectedItemId,
});
export const updateFolderAll = (
  arrayOfNotesIdThatWillBeDeleting,
  folderAllNotesId
) => ({
  type: UPDATE_FOLDER_ALL,
  arrayOfNotesIdThatWillBeDeleting,
  folderAllNotesId,
});
