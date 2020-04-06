import { HIDE_FOLDERS } from "../types"

const hideFoldersReducer = (state = false, action) => {
  switch (action.type) {
    case HIDE_FOLDERS:
      return !state

    default:
      return state
  }
}

export default hideFoldersReducer
