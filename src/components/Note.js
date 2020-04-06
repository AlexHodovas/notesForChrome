import React, { useState } from "react"
import cn from "classnames"
import { useDrag } from "react-dnd"
import { connect } from "react-redux"
import Box from "@material-ui/core/Box"
import { styled, makeStyles } from "@material-ui/core/styles"
import DeleteNoteBtn from "./buttons/DeleteNoteBtn"
import EditNoteNameBtn from "./buttons/EditNoteNameBtn"

import {
  getSelectedNoteId,
  getIsUserPressEditNoteNameBtn,
  getFolders,
} from "../redux/store"
import {
  saveNoteId,
  pressEditNoteNameBtn,
  openDialog,
  addNote,
  changeNoteName,
  deleteNoteOnDragEnd,
  saveSelectedItemId,
} from "../redux/actions"

const NoteWrapper = styled(Box)({
  display: "flex",
  width: 300,
  alignItems: "flex-end",
})

const useStyles = makeStyles(() => ({
  editNoteNameInput: {
    minWidth: 294,
    fontSize: 14,
    margin: "5px 0",
    height: 22,

    ["@media (max-width:599px)"]: {// eslint-disable-line no-useless-computed-key
      fontSize: 16,
      width: "78vw",
      padding: 5,
      paddingLeft: 20,
    },
    ["@media (max-width:500px)"]: {// eslint-disable-line no-useless-computed-key
      width: "90%",
    },
  },
  noteLabel: {
    display: "block",
    minWidth: 220,
    fontSize: 14,
    padding: 5,
    paddingRight: 0,

    ["@media (max-width:599px)"]: {// eslint-disable-line no-useless-computed-key
      fontSize: 16,
      padding: "10px 0 10px 20px",
      minWidth: "73vw",
    },
    ["@media (max-width:500px)"]: {// eslint-disable-line no-useless-computed-key
      minWidth: "69vw",
    },
    ["@media (max-width:440px)"]: {// eslint-disable-line no-useless-computed-key
      minWidth: "62vw",
    },
    ["@media (max-width:360px)"]: {// eslint-disable-line no-useless-computed-key
      minWidth: "58vw",
      paddingLeft: 10,
    },
  },
}))

const style = {
  backgroundColor: "white",
  width: "fit-content",
}

const styleForMobile = {
  backgroundColor: "white",
  width: "100%",
}

const itemTypesForReactDND = { BOX: "box" }

const Note = ({
  note,
  isUserPressEditNoteNameButton,
  saveNoteId,
  selectedNoteId,
  pressEditNoteNameBtn,
  openDialog,
  addNote,
  changeNoteName,
  deleteNoteOnDragEnd,
  folders,
  saveSelectedItemId,
  mobile,
}) => {
  const classes = useStyles()
  const { noteName, noteId } = note
  const [newNoteName, setNewNoteName] = useState("")

  const handleInputChange = (value) => {
    setNewNoteName(value)
  }

  const item = { ...note, type: itemTypesForReactDND.BOX }
  const [{ opacity }, drag] = useDrag({
    item,
    end(item, monitor) {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        const isDropAllowed =
          dropResult.allowedDropEffect === "any" ||
          dropResult.allowedDropEffect === dropResult.dropEffect
        if (isDropAllowed) {
          // alert(
          // `
          //   You ${dropResult.dropEffect} 
          //   noteName - ${noteName} - ${noteId}
          //   into ${dropResult.name}!
          // `
          // );
          const folderIdOnDragEnd = monitor.getDropResult().name;
          const droppedFolder = folders.find((folder, i) => {
            let needFolder = null
            if (i > 0) {
              needFolder = folder.notesInThisFolder.some(
                (note) => note.noteId === noteId
              )
            }
            return needFolder
          })

          if (droppedFolder && droppedFolder.folderId) {
            deleteNoteOnDragEnd(droppedFolder.folderId,noteId)
          }
          addNote(folderIdOnDragEnd, note)
        }
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  if (selectedNoteId === noteId && isUserPressEditNoteNameButton) {
    return (
      <div>
        <input
          autoFocus
          maxLength="20"
          type="text"
          placeholder="New Note"
          defaultValue={noteName}
          className={classes.editNoteNameInput}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={() => {
            pressEditNoteNameBtn(false)
            if (newNoteName === "") return
            changeNoteName(newNoteName, noteId)
          }}
        />
      </div>
    )
  } else {
    return (
      <div
        ref={drag}
        style={mobile ? { ...styleForMobile, opacity } : { ...style, opacity }}
      >
        <li
          onDoubleClick={() => openDialog(true)}
          onClick={() => {
            saveNoteId(noteId);
            saveSelectedItemId(noteId);
          }}
          className={cn("note-li ", {
            selected: selectedNoteId === noteId,
          })}
        >
          <NoteWrapper>
            <label className={classes.noteLabel}>{noteName}</label>
            <DeleteNoteBtn noteId={noteId} />
            <EditNoteNameBtn noteId={noteId} />
          </NoteWrapper>
        </li>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isUserPressEditNoteNameButton: getIsUserPressEditNoteNameBtn(state),
  selectedNoteId: getSelectedNoteId(state),
  folders: getFolders(state),
})

const mapDispatchToProps = (dispatch) => ({
  pressEditNoteNameBtn: (value) => dispatch(pressEditNoteNameBtn(value)),
  saveNoteId: (noteId) => dispatch(saveNoteId(noteId)),
  openDialog: (value) => dispatch(openDialog(value)),
  addNote: (folderIdOnDragEnd, note) => dispatch(addNote(folderIdOnDragEnd, note)),
  changeNoteName: (noteName, noteId) => dispatch(changeNoteName(noteName, noteId)),
  deleteNoteOnDragEnd: (folderId, noteId) =>
    dispatch(deleteNoteOnDragEnd(folderId, noteId)),
  saveSelectedItemId: (itemId) => dispatch(saveSelectedItemId(itemId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
