import { IS_DIALOG_OPENED } from "../types";

const dialogReducer = (state = false, action) => {
  switch (action.type) {
    case IS_DIALOG_OPENED:
      return action.value;

    default:
      return state;
  }
};

export default dialogReducer;
