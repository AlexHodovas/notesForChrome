import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'

//reducers
import hideFoldersReducer from "./reducers/hideFoldersReducer"
import folderReducer from "./reducers/folderReducer"
import saveFolderIdReducer from "./reducers/saveFolderIdReducer"
import pressAddFolderBtnReducer from "./reducers/pressAddFolderBtnReducer"
import pressEditFolderNameBtnReducer from "./reducers/pressEditFolderNameBtnReducer"
import pressAddNoteNameBtnReducer from "./reducers/pressAddNoteNameBtnReducer"
import pressEditNoteNameBtnReducer from "./reducers/pressEditNoteNameBtnReducer"
import saveNoteIdReducer from "./reducers/saveNoteIdReducer"
import saveSelectedItemIdReducer from "./reducers/saveSelectedItemIdReducer"
import dialogReducer from "./reducers/dialogReducer"

// selectors
export const getFolders = (state) => state.folders
export const getIsFoldersHidden = (state) => state.isFoldersHidden
export const getIsUserPressAddFolderBtn = (state) =>
  state.isUserPressAddFolderBtn
export const getIsUserPressEditFolderNameBtn = (state) =>
  state.isUserPressEditFolderNameBtn
export const getIsUserPressAddNoteNameBtn = (state) =>
  state.isUserPressAddNoteNameBtn
export const getIsUserPressEditNoteNameBtn = (state) =>
  state.isUserPressEditNoteNameBtn
export const getSelectedFolderId = (state) => state.selectedFolderId
export const getSelectedNoteId = (state) => state.selectedNoteId
export const getSelectedItemId = (state) => state.selectedItemId
export const getIsDialogOpened = (state) => state.isDialogOpened

const rootReducer = combineReducers({
  folders: folderReducer,
  isFoldersHidden: hideFoldersReducer,
  isUserPressAddFolderBtn: pressAddFolderBtnReducer,
  isUserPressAddNoteNameBtn: pressAddNoteNameBtnReducer,
  isUserPressEditFolderNameBtn: pressEditFolderNameBtnReducer,
  isUserPressEditNoteNameBtn: pressEditNoteNameBtnReducer,
  isDialogOpened: dialogReducer,
  selectedFolderId: saveFolderIdReducer,
  selectedNoteId: saveNoteIdReducer,
  selectedItemId: saveSelectedItemIdReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware()
  ),
)

setTimeout(() => {
  console.log("smile :)")
}, 5000)

export default store
