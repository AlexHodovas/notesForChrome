import { SAVE_SELECTED_ITEM_ID } from "../types";

const saveSelectedItemIdReducer = (state = '', action) => {
  switch (action.type) {
    case SAVE_SELECTED_ITEM_ID:
      return action.itemId;

    default:
      return state;
  }
};

export default saveSelectedItemIdReducer;