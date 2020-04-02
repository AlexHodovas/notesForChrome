import React, { useState } from "react";
import cn from "classnames";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import DeleteFolderButton from "./buttons/DeleteFolderButton";
import EditFolderNameButton from "./buttons/EditFolderNameButton";
import ItemTypesForReactDND from "./ItemTypesForReactDND";

import {
  getSelectedFolderIdForEditing,
  getIsUserPressEditFolderNameBtn
} from "../redux/store";
import {
  changeFolderName,
  saveFolderIdForEditing,
  userPressAddFolderButton,
  userPressEditFolderNameButton,
  saveItemIdForDeleting
} from "../redux/actions";

const style = {
  color: "white"
};

function selectBackgroundColor(isActive, canDrop, folderId) {
  if (folderId === "folderAllNotes") {
    return "";
  }

  if (isActive) {
    return "darkgreen";
  } else if (canDrop) {
    return "darkkhaki";
  } else {
    return "";
  }
}

const Folder = ({
  allowedDropEffect,
  folder,
  changeFolderName,
  saveFolderIdForEditing,
  selectedFolderIdForEditing,
  isUserPressEditFolderNameButton,
  userPressEditFolderNameButtonFromProps,
  saveItemIdForDeleting
}) => {
  const { folderName, folderId } = folder;
  const [newFolderName, setNewFolderName] = useState("");

  const handleInputChange = value => {
    setNewFolderName(value);
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypesForReactDND.BOX,
    drop: () => ({
      name: folderId,
      allowedDropEffect
    }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop, folderId);

  if (
    selectedFolderIdForEditing === folderId &&
    isUserPressEditFolderNameButton
  ) {
    return (
      <div>
        <input
          maxLength="20"
          autoFocus
          placeholder="New Folder"
          defaultValue={folderName}
          onChange={e => handleInputChange(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              changeFolderName(newFolderName, folderId);
              userPressEditFolderNameButtonFromProps(false);
            }
          }}
          type="text"
          className="editFolderNameInput"
        />
      </div>
    );
  } else if (folderId === "folderAllNotes") {
    return (
      <div style={{ ...style, backgroundColor }}>
        <li
          onClick={() => {
            saveFolderIdForEditing(folderId);
            saveItemIdForDeleting(folderId);
          }}
          className={cn("folder-li", {
            selected: selectedFolderIdForEditing === folderId
          })}
        >
          <div className="folder">
            <label className={cn("folder__label")}>{folderName}</label>
          </div>
        </li>
      </div>
    );
  } else {
    return (
      <div ref={drop} style={{ ...style, backgroundColor }}>
        <li
          onClick={() => {
            saveFolderIdForEditing(folderId);
            saveItemIdForDeleting(folderId);
          }}
          className={cn("folder-li", {
            selected: selectedFolderIdForEditing === folderId
          })}
        >
          <div className="folder">
            <label className={cn("folder__label")}>{folderName}</label>
            <DeleteFolderButton folderId={folderId} />
            <EditFolderNameButton folderId={folderId} />
          </div>
        </li>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isUserPressEditFolderNameButton: getIsUserPressEditFolderNameBtn(state),
  selectedFolderIdForEditing: getSelectedFolderIdForEditing(state)
});

const mapDispatchToProps = dispatch => ({
  userPressAddFolderButton: value => dispatch(userPressAddFolderButton(value)),
  userPressEditFolderNameButtonFromProps: value =>
    dispatch(userPressEditFolderNameButton(value)),
  changeFolderName: (folderName, folderId) =>
    dispatch(changeFolderName(folderName, folderId)),
  saveFolderIdForEditing: folderId =>
    dispatch(saveFolderIdForEditing(folderId)),
  saveItemIdForDeleting: folderId => dispatch(saveItemIdForDeleting(folderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
