import React from "react"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { connect } from "react-redux"
import findNoteBody from "../helpers/findNoteBody"
import findNoteName from "../helpers/findNoteName"
import notesInThisFolder from "../helpers/notesInThisFolder"

import {
  getIsDialogOpened,
  getSelectedFolderId,
  getSelectedNoteId,
  getFolders,
} from "../redux/store"
import {
  openDialog,
  changeNoteName,
  changeNoteBody,
} from "../redux/actions"

const DialogForEditingNote = ({
  folders,
  isDialogOpened,
  openDialog,
  selectedNoteId,
  changeNoteBody,
  changeNoteName,
  selectedFolderId,
}) => {
  const handleNoteBodyChanging = (value) => {
    changeNoteBody(value, selectedNoteId)
  }

  const handleNoteNameChanging = (value) => {
    changeNoteName(value, selectedNoteId)
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
            onBlur={() => {openDialog(false)}}
          >
            <TextField
              rows="2"
              multiline
              label="Note name"
              variant="outlined"
              id="outlined-multiline-static"
              value={findNoteName(
                notesInThisFolder(folders,selectedFolderId), selectedNoteId
              )}
              onChange={(e) => handleNoteNameChanging(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <TextField
              rows="6"
              multiline
              label="Note"
              variant="outlined"
              id="outlined-multiline-static"
              value={findNoteBody(
                notesInThisFolder(folders,selectedFolderId), selectedNoteId
              )}
              onChange={(e) => handleNoteBodyChanging(e.target.value)}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => ({
  folders: getFolders(state),
  isDialogOpened: getIsDialogOpened(state),
  selectedNoteId: getSelectedNoteId(state),
  selectedFolderId: getSelectedFolderId(state),
})

const mapDispatchToProps = (dispatch) => ({
  openDialog: (value) => dispatch(openDialog(value)),
  changeNoteName: (noteName, noteId) => dispatch(changeNoteName(noteName, noteId)),
  changeNoteBody: (noteBody, noteId) => dispatch(changeNoteBody(noteBody, noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogForEditingNote)
