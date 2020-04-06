import { PRESS_EDIT_FOLDER_NAME_BTN } from "../types"

const pressEditFolderNameBtnReducer = (state = false, action) => {
  switch (action.type) {
    case PRESS_EDIT_FOLDER_NAME_BTN:
      return action.value

    default:
      return state
  }
}

export default pressEditFolderNameBtnReducer