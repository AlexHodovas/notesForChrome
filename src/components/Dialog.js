import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { connect } from "react-redux"
import findNoteBody from "../helpers/findNoteBody"
import findNoteName from "../helpers/findNoteName"

import {
  getIsDialogOpened,
  getSelectedNoteIdForEditing,
  getNotes,
} from "../redux/store"
import {
  openDialog,
  changeNoteBody,
  changeNoteName,
  changeNoteBodyInNotesInThisFolder,
  changeNoteNameInNotesInThisFolder,
} from "../redux/actions"

const DialogForEditingNoteBody = ({
  notes,
  changeNoteBody,
  changeNoteName,
  isDialogOpened,
  openDialog,
  selectedNoteIdForEditing,
  changeNoteBodyInNotesInThisFolder,
  changeNoteNameInNotesInThisFolder,
}) => {
  const [newNoteBody, setNewNoteBody] = useState("")
  const [newNoteName, setNewNoteName] = useState("")

  const handleNoteBodyChanging = (value) => {
    setNewNoteBody(value)
    changeNoteBody(value, selectedNoteIdForEditing)
  }

  const handleNoteNameChanging = (value) => {
    setNewNoteName(value)
    changeNoteName(value, selectedNoteIdForEditing)
  }

  return (
    <div>
      <Dialog
        open={isDialogOpened}
        onClose={() => openDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Please change your note</DialogContentText>
          <form
            noValidate
            autoComplete="off"
            style={{ display: "flex", flexDirection: "column" }}
            onBlur={() => {
              openDialog(false)
              if (newNoteName === "") return

              changeNoteNameInNotesInThisFolder(
                newNoteName,
                selectedNoteIdForEditing
              )

              changeNoteBodyInNotesInThisFolder(
                newNoteBody,
                selectedNoteIdForEditing
              )
            }}
          >
            <TextField
              rows="2"
              multiline
              label="Note name"
              variant="outlined"
              id="outlined-multiline-static"
              value={findNoteName(notes, selectedNoteIdForEditing)}
              onChange={(e) => handleNoteNameChanging(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <TextField
              rows="6"
              multiline
              label="Note"
              variant="outlined"
              id="outlined-multiline-static"
              value={findNoteBody(notes, selectedNoteIdForEditing)}
              onChange={(e) => handleNoteBodyChanging(e.target.value)}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isDialogOpened: getIsDialogOpened(state),
  selectedNoteIdForEditing: getSelectedNoteIdForEditing(state),
  notes: getNotes(state),
})

const mapDispatchToProps = (dispatch) => ({
  openDialog: (value) => dispatch(openDialog(value)),
  changeNoteBody: (noteBody, noteId) =>
    dispatch(changeNoteBody(noteBody, noteId)),
  changeNoteName: (noteName, noteId) =>
    dispatch(changeNoteName(noteName, noteId)),
  changeNoteBodyInNotesInThisFolder: (noteBody, noteId) =>
    dispatch(changeNoteBodyInNotesInThisFolder(noteBody, noteId)),
  changeNoteNameInNotesInThisFolder: (noteName, noteId) =>
    dispatch(changeNoteNameInNotesInThisFolder(noteName, noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogForEditingNoteBody)
