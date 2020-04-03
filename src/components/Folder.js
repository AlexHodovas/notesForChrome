import React, { useState } from "react";
import cn from "classnames";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import DeleteFolderButton from "./buttons/DeleteFolderBtn";
import EditFolderNameButton from "./buttons/EditFolderNameBtn";
import ItemTypesForReactDND from "./ItemTypesForReactDND";
import { styled, makeStyles } from "@material-ui/core/styles";

import {
  getSelectedFolderIdForEditing,
  getIsUserPressEditFolderNameBtn
} from "../redux/store";
import {
  changeFolderName,
  saveFolderId,
  pressEditFolderNameBtn,
  saveSelectedItemId,
} from "../redux/actions";

const style = {
  color: "white"
};

const useStyles = makeStyles({
  label: {
    display: "block",
    minWidth: 140,
    fontSize: 14,
    padding: 5,
    paddingRight: 0
  },
  editFolderNameInput: {
    fontSize: 14,
    margin: "5px 0"
  },
  folderNameInput: {
    width: 200,
    fontSize: 14,
    marginTop: 10
  }
});

const FolderStyled = styled(Box)({
  display: "flex",
  alignItems: "flex-end"
});

function selectBackgroundColor(isActive, canDrop, folderId) {
  if (folderId === "folderAllNotes") return "";
  if (isActive) return "darkgreen";
  if (canDrop) return "darkkhaki";

  return "";
}

const Folder = ({
  allowedDropEffect,
  folder,
  changeFolderName,
  saveFolderId,
  selectedFolderIdForEditing,
  isUserPressEditFolderNameButton,
  pressEditFolderNameBtn,
  saveSelectedItemId
}) => {
  const classes = useStyles();
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
          onChange={e => {
            handleInputChange(e.target.value);
            changeFolderName(newFolderName, folderId);
          }}
          onBlur={() => {
            pressEditFolderNameBtn(false);
          }}
          type="text"
          className={classes.editFolderNameInput}
        />
      </div>
    );
  }

  if (folderId === "folderAllNotes") {
    return (
      <div style={{ ...style, backgroundColor }}>
        <li
          onClick={() => {
            saveFolderId(folderId);
            saveSelectedItemId(folderId);
          }}
          className={cn("folder-li", {
            selected: selectedFolderIdForEditing === folderId
          })}
        >
          <FolderStyled>
            <label className={classes.label}>{folderName}</label>
          </FolderStyled>
        </li>
      </div>
    );
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <li
        onClick={() => {
          saveFolderId(folderId);
          saveSelectedItemId(folderId);
        }}
        className={cn("folder-li", {
          selected: selectedFolderIdForEditing === folderId
        })}
      >
        <FolderStyled>
          <label className={classes.label}>{folderName}</label>
          <DeleteFolderButton folderId={folderId} />
          <EditFolderNameButton folderId={folderId} />
        </FolderStyled>
      </li>
    </div>
  );
};

const mapStateToProps = state => ({
  isUserPressEditFolderNameButton: getIsUserPressEditFolderNameBtn(state),
  selectedFolderIdForEditing: getSelectedFolderIdForEditing(state)
});

const mapDispatchToProps = dispatch => ({
  pressEditFolderNameBtn: value => dispatch(pressEditFolderNameBtn(value)),
  changeFolderName: (folderName, folderId) =>
    dispatch(changeFolderName(folderName, folderId)),
  saveFolderId: folderId => dispatch(saveFolderId(folderId)),
  saveSelectedItemId: folderId => dispatch(saveSelectedItemId(folderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
