import { SAVE_FOLDER_ID } from "../types"

const saveFolderIdReducer = (state = "folderAllNotes", action) => {
  switch (action.type) {
    case SAVE_FOLDER_ID:
      return action.folderId

    default:
      return state
  }
}

export default saveFolderIdReducer