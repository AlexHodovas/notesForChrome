import { SAVE_FOLDER_ID_FOR_EDITING } from "../actions";

const saveFolderIdForEditingReducer = (state = 'folderAllNotes', action) => {
  switch (action.type) {
    case SAVE_FOLDER_ID_FOR_EDITING:
      return action.folderId;

    default:
      return state;
  }
};

export default saveFolderIdForEditingReducer;