import { createStore, combineReducers } from "redux";
import { loadState, saveState } from "./localStorage";

//reducers
import hideFoldersReducer from "./reducers/hideFoldersReducer";
import folderReducer from "./reducers/folderReducer";
import saveFolderIdReducer from "./reducers/saveFolderIdReducer";
import pressAddFolderBtnReducer from "./reducers/pressAddFolderBtnReducer";
import pressEditFolderNameBtnReducer from "./reducers/pressEditFolderNameBtnReducer";

import noteReducer from "./reducers/noteReducer";
import pressAddNoteNameBtnReducer from "./reducers/pressAddNoteNameBtnReducer";
import pressEditNoteNameBtnReducer from "./reducers/pressEditNoteNameBtnReducer";
import saveNoteIdReducer from "./reducers/saveNoteIdReducer";

import saveItemIdForDeletingReducer from "./reducers/saveItemIdForDeletingReducer";
import isDialogForNoteEditingOpenedReducer from "./reducers/isDialogForNoteEditingOpenedReducer";

// selectors
export const getIsFoldersHidden = state => state.isFoldersHidden;
export const getFolders = state => state.folders;
export const getIsUserPressAddFolderBtn = state =>
  state.isUserPressAddFolderBtn;
export const getIsUserPressEditFolderNameBtn = state =>
  state.isUserPressEditFolderNameBtn;
export const getSelectedFolderIdForEditing = state =>
  state.selectedFolderIdForEditing;
export const getNotes = state => state.notes;
export const getIsUserPressAddNoteNameBtn = state =>
  state.isUserPressAddNoteNameBtn;
export const getIsUserPressEditNoteNameBtn = state =>
  state.isUserPressEditNoteNameBtn;
export const getSelectedNoteIdForEditing = state =>
  state.selectedNoteIdForEditing;
export const getSelectedItemIdForDeleting = state =>
  state.selectedItemIdForDeleting;
export const getIsDialogForNoteBodyEditingOpened = state =>
  state.isDialogForNoteBodyEditingOpened;

//rootReducer
const rootReducer = combineReducers({
  isFoldersHidden: hideFoldersReducer,
  folders: folderReducer,
  isUserPressAddFolderBtn: pressAddFolderBtnReducer,
  isUserPressEditFolderNameBtn: pressEditFolderNameBtnReducer,
  selectedFolderIdForEditing: saveFolderIdReducer,

  notes: noteReducer,
  isUserPressAddNoteNameBtn: pressAddNoteNameBtnReducer,
  isUserPressEditNoteNameBtn: pressEditNoteNameBtnReducer,
  selectedNoteIdForEditing: saveNoteIdReducer,

  selectedItemIdForDeleting: saveItemIdForDeletingReducer,
  isDialogForNoteBodyEditingOpened: isDialogForNoteEditingOpenedReducer
});

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState({
    isFoldersHidden: store.getState().isFoldersHidden,
    folders: store.getState().folders,
    isUserPressAddFolderBtn: store.getState().isUserPressAddFolderBtn,
    isUserPressEditFolderNameBtn: store.getState().isUserPressEditFolderNameBtn,
    selectedFolderIdForEditing: store.getState().selectedFolderIdForEditing,

    notes: store.getState().notes,
    isUserPressAddNoteNameBtn: store.getState().isUserPressAddNoteNameBtn,
    isUserPressEditNoteNameBtn: store.getState().isUserPressEditNoteNameBtn,
    selectedNoteIdForEditing: store.getState().selectedNoteIdForEditing,

    selectedItemIdForDeleting: store.getState().selectedItemIdForDeleting,
    isDialogForNoteBodyEditingOpened: store.getState()
      .isDialogForNoteBodyEditingOpened
  });
});

setTimeout(() => {
  console.log("smile :)");
}, 5000);

export default store;
