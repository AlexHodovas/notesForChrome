import { USER_PRESS_ADD_FOLDER_BUTTON } from "../actions";

const pressAddFolderBtnReducer = (state = false, action) => {
  switch (action.type) {
    case USER_PRESS_ADD_FOLDER_BUTTON:
      return action.value;

    default:
      return state;
  }
};

export default pressAddFolderBtnReducer;