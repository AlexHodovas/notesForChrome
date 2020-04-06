import React, { useState } from "react"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Folder from "./Folder"
import { getFolders, getIsUserPressAddFolderBtn } from "../redux/store"
import {
  addFolder,
  pressAddFolderBtn,
  changeFolderName,
  saveFolderId,
  saveSelectedItemId,
} from "../redux/actions"

const useStyles = makeStyles({
  input: {
    width: "92%",
    display: "block",
    fontSize: 14,
    padding: 5,
    paddingRigh: 0,

    ["@media (max-width:1040px)"]: {// eslint-disable-line no-useless-computed-key
      width: "90%",
    },
  },
  mobileInput: {
    width: "94%",
    display: "block",
    fontSize: 16,
    padding: 5,
    paddingLeft: 20,

    ["@media (max-width:500px)"]: {// eslint-disable-line no-useless-computed-key
      width: "90%",
    },
  },
})

const Folders = ({
  folders,
  isUserPressAddFolderButton,
  pressAddFolderBtn,
  addFolder,
  saveFolderId,
  mobile,
  saveSelectedItemId,
}) => {
  const classes = useStyles()
  const [currentFolder, setCurrentFolder] = useState({
    folderId: null,
    folderName: null,
    notesInThisFolder: [],
  })

  const handleInputChange = (value) => {
    setCurrentFolder((prevState) => {
      return {
        ...prevState,
        folderId: `folderID-${+new Date()}`,
        folderName: value,
      }
    })
  }

  return (
    <>
      <div>
        {folders.length > 0 && (
          <ul style={{ marginTop: "0" }}>
            {folders.map((folder) => (
              <Folder
                allowedDropEffect="move"
                folder={folder}
                key={folder.folderId}
                mobile={mobile}
              />
            ))}

            {isUserPressAddFolderButton && (
              <div>
                <input
                  maxLength="20"
                  autoFocus
                  placeholder="New Folder"
                  onChange={(e) => handleInputChange(e.target.value)}
                  onBlur={() => {
                    pressAddFolderBtn(false)
                    if (
                      currentFolder.folderName === null ||
                      currentFolder.folderName.trim() === ""
                    ) {
                      return
                    }
                    addFolder(currentFolder)
                    saveFolderId(currentFolder.folderId)
                    saveSelectedItemId(currentFolder.folderId)
                  }}
                  type="text"
                  className={mobile ? classes.mobileInput : classes.input}
                />
              </div>
            )}
          </ul>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  folders: getFolders(state),
  isUserPressAddFolderButton: getIsUserPressAddFolderBtn(state),
})

const mapDispatchToProps = (dispatch) => ({
  addFolder: (folder) => dispatch(addFolder(folder)),
  pressAddFolderBtn: (value) => dispatch(pressAddFolderBtn(value)),
  changeFolderName: (folderName, folderId) =>
    dispatch(changeFolderName(folderName, folderId)),
  saveFolderId: (folderId) => dispatch(saveFolderId(folderId)),
  saveSelectedItemId: (selectedId) => dispatch(saveSelectedItemId(selectedId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Folders)
