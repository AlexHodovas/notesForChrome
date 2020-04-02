import { SAVE_ITEM_ID_FOR_DELETING } from "../actions";

const saveFolderIdForEditingReducer = (state = '', action) => {
  switch (action.type) {
    case SAVE_ITEM_ID_FOR_DELETING:
      return action.itemId;

    default:
      return state;
  }
};

export default saveFolderIdForEditingReducer;