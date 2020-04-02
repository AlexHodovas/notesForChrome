import React, { useState } from "react";
import cn from "classnames";
import { useDrag } from "react-dnd";
import { connect } from "react-redux";
import DeleteNoteButton from "./buttons/DeleteNoteButton";
import EditNoteNameButton from "./buttons/EditNoteNameButton";
import ItemTypesForReactDND from "./ItemTypesForReactDND";

import {
  getSelectedNoteIdForEditing,
  getIsUserPressEditNoteNameBtn,
  getFolders
} from "../redux/store";
import {
  changeNoteName,
  saveNoteIdForEditing,
  userPressEditNoteNameButton,
  userPressDoubleClickForNoteBodyEditing,
  changeNotesInThisFolder,
  changeNoteNameInNotesInThisFolder,
  deleteNoteInNotesInThisFolderOnDragEnd,
  saveItemIdForDeleting
} from "../redux/actions";

const style = {
  backgroundColor: "white"
};

const Note = ({
  note,
  changeNoteName,
  isUserPressEditNoteNameButton,
  saveNoteIdForEditing,
  selectedNoteIdForEditing,
  userPressEditNoteNameButtonFromProps,
  userPressDoubleClickForNoteBodyEditing,

  changeNotesInThisFolder,
  changeNoteNameInNotesInThisFolder,
  deleteNoteInNotesInThisFolderOnDragEnd,
  folders,
  saveItemIdForDeleting
}) => {
  const { noteName, noteId } = note;
  const [newNoteName, setNewNoteName] = useState("");

  const handleInputChange = value => {
    setNewNoteName(value);
  };

  const item = { ...note, type: ItemTypesForReactDND.BOX };
  const [{ opacity }, drag] = useDrag({
    item,
    end(item, monitor) {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const isDropAllowed =
          dropResult.allowedDropEffect === "any" ||
          dropResult.allowedDropEffect === dropResult.dropEffect;
        if (isDropAllowed) {
          // alert(
          //   `You ${dropResult.dropEffect} noteName - ${noteName} - ${noteId}into ${dropResult.name}!`
          // );
          const folderIdOnDragEnd = monitor.getDropResult().name;
          const droppedFolder = folders.find((folder, i) => {
            let needFolder = null;
            if (i > 0) {
              needFolder = folder.notesInThisFolder.some(
                note => note.noteId === noteId
              );
            }
            return needFolder;
          });

          if (droppedFolder) {
            if (droppedFolder.folderId) {
              deleteNoteInNotesInThisFolderOnDragEnd(
                droppedFolder.folderId,
                noteId
              );
            }
          }
          changeNotesInThisFolder(folderIdOnDragEnd, note);
        }
      }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });

  if (selectedNoteIdForEditing === noteId && isUserPressEditNoteNameButton) {
    return (
      <div>
        <input
          maxLength="20"
          autoFocus
          placeholder="New Note"
          defaultValue={noteName}
          onChange={e => handleInputChange(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              changeNoteName(newNoteName, noteId);
              changeNoteNameInNotesInThisFolder(newNoteName, noteId);
              userPressEditNoteNameButtonFromProps(false);
            }
          }}
          type="text"
          className="editNoteNameInput"
        />
      </div>
    );
  } else {
    return (
      <div ref={drag} style={{ ...style, opacity }}>
        <li
          onDoubleClick={() => userPressDoubleClickForNoteBodyEditing(true)}
          onClick={() => {
            saveNoteIdForEditing(noteId);
            saveItemIdForDeleting(noteId);
          }}
          className={cn("note-li ", {
            selected: selectedNoteIdForEditing === noteId
          })}
        >
          <div className="note">
            <label className={cn("note__label")}>{noteName}</label>
            <DeleteNoteButton noteId={noteId} />
            <EditNoteNameButton noteId={noteId} />
          </div>
        </li>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isUserPressEditNoteNameButton: getIsUserPressEditNoteNameBtn(state),
  selectedNoteIdForEditing: getSelectedNoteIdForEditing(state),

  folders: getFolders(state)
});

const mapDispatchToProps = dispatch => ({
  userPressEditNoteNameButtonFromProps: value =>
    dispatch(userPressEditNoteNameButton(value)),
  changeNoteName: (noteName, noteId) =>
    dispatch(changeNoteName(noteName, noteId)),
  saveNoteIdForEditing: noteId => dispatch(saveNoteIdForEditing(noteId)),
  userPressDoubleClickForNoteBodyEditing: value =>
    dispatch(userPressDoubleClickForNoteBodyEditing(value)),
  changeNotesInThisFolder: (folderIdOnDragEnd, note) =>
    dispatch(changeNotesInThisFolder(folderIdOnDragEnd, note)),
  changeNoteNameInNotesInThisFolder: (noteName, noteId) =>
    dispatch(changeNoteNameInNotesInThisFolder(noteName, noteId)),
  deleteNoteInNotesInThisFolderOnDragEnd: (folderId, noteId) =>
    dispatch(deleteNoteInNotesInThisFolderOnDragEnd(folderId, noteId)),
  saveItemIdForDeleting: itemId => dispatch(saveItemIdForDeleting(itemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
