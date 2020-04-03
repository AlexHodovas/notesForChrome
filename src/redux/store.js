import { createStore, combineReducers } from "redux";

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
import saveSelectedItemIdReducer from "./reducers/saveSelectedItemIdReducer";
import dialogReducer from "./reducers/dialogReducer";

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
export const getIsDialogOpened = state =>
  state.isDialogOpened;

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
  selectedItemIdForDeleting: saveSelectedItemIdReducer,
  isDialogOpened: dialogReducer,
});

const store = createStore(rootReducer);

setTimeout(() => {
  console.log("smile :)");
}, 5000);

export default store;
