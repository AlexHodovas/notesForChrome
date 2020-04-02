import React, { useState } from "react";
import { connect } from "react-redux";
import Folder from "./Folder";
import {
  getFolders,
  getIsUserPressAddFolderBtn,
} from "../redux/store";
import {
  addFolder,
  userPressAddFolderButton,
  changeFolderName,
  saveFolderIdForEditing,
} from "../redux/actions";

const Folders = ({
  folders,
  isUserPressAddFolderButton,
  userPressAddFolderButton,
  addFolderFromProps,
  saveFolderIdForEditing,
}) => {
  const [currentFolder, setCurrentFolder] = useState({
    folderId: null,
    folderName: null,
    notesInThisFolder: [],
  });

  const handleInputChange = value => {
    setCurrentFolder(prevState => {
      return {
        ...prevState,
        folderId: `folderID-${+new Date()}`,
        folderName: value
      };
    });
  };

  return (
    <>
      <div>
        {folders.length > 0 && (
          <ul className="ul">
            {folders.map(folder => (
              <Folder allowedDropEffect="move" folder={folder} key={folder.folderId} />
            ))}

            {isUserPressAddFolderButton && (
              <div>
                <input
                  maxLength="20"
                  autoFocus
                  placeholder="New Folder"
                  onChange={e => handleInputChange(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      addFolderFromProps(currentFolder);
                      userPressAddFolderButton(false);
                      saveFolderIdForEditing(currentFolder.folderId);
                    }
                  }}
                  type="text"
                  className="folderNameInputWhenFoldersLengthMoreThanOne"
                />
              </div>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  folders: getFolders(state),
  isUserPressAddFolderButton: getIsUserPressAddFolderBtn(state),
});

const mapDispatchToProps = dispatch => ({
  addFolderFromProps: folder => dispatch(addFolder(folder)),
  userPressAddFolderButton: value => dispatch(userPressAddFolderButton(value)),
  changeFolderName: (folderName, folderId) =>
    dispatch(changeFolderName(folderName, folderId)),
  saveFolderIdForEditing: (folderId) =>
    dispatch(saveFolderIdForEditing(folderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Folders);