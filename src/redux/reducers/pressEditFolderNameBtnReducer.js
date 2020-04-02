import { USER_PRESS_EDIT_FOLDER_NAME_BUTTON } from "../actions";

const pressEditFolderNameBtnReducer = (state = false, action) => {
  switch (action.type) {
    case USER_PRESS_EDIT_FOLDER_NAME_BUTTON:
      return action.value;

    default:
      return state;
  }
};

export default pressEditFolderNameBtnReducer;