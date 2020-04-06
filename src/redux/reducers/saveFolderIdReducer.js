import { SAVE_FOLDER_ID } from "../types"

const saveFolderIdForEditingReducer = (state = "folderAllNotes", action) => {
  switch (action.type) {
    case SAVE_FOLDER_ID:
      return action.folderId

    default:
      return state
  }
}

export default saveFolderIdForEditingReducer