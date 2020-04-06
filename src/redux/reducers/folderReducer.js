import {
  ADD_FOLDER,
  ADD_NOTE,
  DELETE_FOLDER,
  CHANGE_FOLDER_NAME,
  CHANGE_NOTE_BODY,
  CHANGE_NOTE_NAME,
  DELETE_NOTE,
  DELETE_NOTE_ON_DRAG_END,
  DELETE_SELECTED_ITEM,
  UPDATE_FOLDER_ALL,
} from "../types"

const initialState = [
  {
    folderId: "folderAllNotes",
    folderName: "All",
    notesInThisFolder: [],
  },
]

const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOLDER:
      return [
        ...state,
        {
          folderId: action.folder.folderId,
          folderName: action.folder.folderName,
          notesInThisFolder: [],
        },
      ]

    case DELETE_FOLDER:
      return state.filter((folder) => folder.folderId !== action.folderId)

    case CHANGE_FOLDER_NAME:
      return state.map((folder) => {
        if (
          action.folderId !== folder.folderId ||
          folder.folderName === action.folderName
        ) {
          return folder
        }

        return {
          ...folder,
          folderName: action.folderName
        }
      })

    case ADD_NOTE:
      return state.map((folder, index) => {
        if (
          index === 0 &&
          (action.folderId === "folderAllNotes") === folder.folderId
        ) {
          return {
            ...folder,
            notesInThisFolder: [...folder.notesInThisFolder, action.note],
          }
        }

        if (folder.folderId === action.folderId) return {
          ...folder,
          notesInThisFolder: [...folder.notesInThisFolder, action.note]
        }

        return folder
      })

    case DELETE_NOTE_ON_DRAG_END:
      return state.map((folder, index) => {
        if (
          index === 0 &&
          action.folderId === "folderAllNotes" &&
          action.folderId === folder.folderId
        ) {
          return folder
        }

        if (folder.folderId === action.folderId) {
          return {
            ...folder,
            notesInThisFolder: folder.notesInThisFolder.filter(
              (note) => note.noteId !== action.noteId
            )
          }
        }

        return folder
      })

    case CHANGE_NOTE_BODY:
      return state.map((folder) => {
        return {
          ...folder,
          notesInThisFolder: folder.notesInThisFolder.map((note) => {
            if (
              action.noteId !== note.noteId ||
              action.noteBody === note.noteBody
            ) {
              return note
            }

            return {
              ...note,
              noteBody: action.noteBody,
            }
          })
        }
      })

    case CHANGE_NOTE_NAME:
      return state.map((folder) => {
        return {
          ...folder,
          notesInThisFolder: folder.notesInThisFolder.map((note) => {
            if (
              action.noteId !== note.noteId ||
              action.noteName === note.noteName
            ) {
              return note
            }

            return {
              ...note,
              noteName: action.noteName,
            }
          }),
        }
      })

    case DELETE_NOTE:
      return state.map((folder) => {
        if (folder.notesInThisFolder.length === 0) {
          return {
            ...folder,
            notesInThisFolder: [],
          }
        } else {
          return {
            ...folder,
            notesInThisFolder: folder.notesInThisFolder.filter(
              (note) => note.noteId !== action.noteId
            )
          }
        }
      })

    case DELETE_SELECTED_ITEM:
      const selectedItemIdFromAction = action.selectedItemId

      if (selectedItemIdFromAction.includes("folder")) {
        return state.filter((folder, index) => {
          if (
            index === 0 &&
            selectedItemIdFromAction === "folderAllNotes" &&
            selectedItemIdFromAction === folder.folderId
          ) {
            return folder
          } else {
            return folder.folderId !== selectedItemIdFromAction
          }
        })
      } else {
        return state.map(folder => {
          return {
            ...folder,
            notesInThisFolder: folder.notesInThisFolder.filter(
              (note) => note.noteId !== selectedItemIdFromAction
            )
          }
        })
      }

    case UPDATE_FOLDER_ALL:
      if(action.arrayOfNotesIdThatWillBeDeleting.length === 0) return state
       
      return state.map((folder) => {
        if (action.folderAllNotesId === "folderAllNotes") {
          return {
            ...folder,
            notesInThisFolder: folder.notesInThisFolder.filter(
              (note) => !action.arrayOfNotesIdThatWillBeDeleting.includes(note.noteId)
            )
          }
        }
        return folder
        
      })

    default:
      return state
  }
}

export default folderReducer
