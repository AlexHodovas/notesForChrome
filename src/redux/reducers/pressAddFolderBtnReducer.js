import { PRESS_ADD_FOLDER_BTN } from "../types";

const pressAddFolderBtnReducer = (state = false, action) => {
  switch (action.type) {
    case PRESS_ADD_FOLDER_BTN:
      return action.value;

    default:
      return state;
  }
};

export default pressAddFolderBtnReducer;