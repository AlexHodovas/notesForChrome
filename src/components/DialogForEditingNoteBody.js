import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";

import {
  getIsDialogForNoteBodyEditingOpened,
  getSelectedNoteIdForEditing,
  getNotes
} from "../redux/store";
import {
  userPressDoubleClickForNoteBodyEditing,
  changeNoteBody,
  changeNoteBodyInNotesInThisFolder
} from "../redux/actions";

const DialogForEditingNoteBody = ({
  notes,
  changeNoteBody,
  isDialogForNoteBodyEditingOpened,
  userPressDoubleClickForNoteBodyEditing,
  selectedNoteIdForEditing,
  changeNoteBodyInNotesInThisFolder
}) => {
  const [newNoteBody, setNewNoteBody] = useState("");

  const handleTextFieldChange = value => {
    setNewNoteBody(value);
    changeNoteBody(value, selectedNoteIdForEditing);
  };

  return (
    <div>
      <Dialog
        open={isDialogForNoteBodyEditingOpened}
        onClose={() => userPressDoubleClickForNoteBodyEditing(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Please change your note and press confirm
          </DialogContentText>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-multiline-static"
              label="Note"
              multiline
              rows="6"
              variant="outlined"
              value={
                notes.find(note => note.noteId === selectedNoteIdForEditing)
                  .noteBody === null
                  ? ""
                  : notes.find(note => note.noteId === selectedNoteIdForEditing)
                      .noteBody
              }
              onChange={e => handleTextFieldChange(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              userPressDoubleClickForNoteBodyEditing(false);
              changeNoteBodyInNotesInThisFolder(
                newNoteBody,
                selectedNoteIdForEditing
              );
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  isDialogForNoteBodyEditingOpened: getIsDialogForNoteBodyEditingOpened(state),
  selectedNoteIdForEditing: getSelectedNoteIdForEditing(state),
  notes: getNotes(state)
});

const mapDispatchToProps = dispatch => ({
  userPressDoubleClickForNoteBodyEditing: value =>
    dispatch(userPressDoubleClickForNoteBodyEditing(value)),
  changeNoteBody: (noteBody, noteId) =>
    dispatch(changeNoteBody(noteBody, noteId)),
  changeNoteBodyInNotesInThisFolder: (noteBody, noteId) =>
    dispatch(changeNoteBodyInNotesInThisFolder(noteBody, noteId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogForEditingNoteBody);
