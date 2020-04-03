import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import findNoteBody from "../helpers/findNoteBody";

import {
  getIsDialogOpened,
  getSelectedNoteIdForEditing,
  getNotes
} from "../redux/store";
import {
  openDialog,
  changeNoteBody,
  changeNoteBodyInNotesInThisFolder
} from "../redux/actions";

const DialogForEditingNoteBody = ({
  notes,
  changeNoteBody,
  isDialogOpened,
  openDialog,
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
        open={isDialogOpened}
        onClose={() => openDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Please change your note and press confirm
          </DialogContentText>
          <form noValidate autoComplete="off">
            <TextField
              rows="6"
              multiline
              label="Note"
              variant="outlined"
              id="outlined-multiline-static"
              value={findNoteBody(notes, selectedNoteIdForEditing)}
              onChange={e => handleTextFieldChange(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              openDialog(false);
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
  isDialogOpened: getIsDialogOpened(state),
  selectedNoteIdForEditing: getSelectedNoteIdForEditing(state),
  notes: getNotes(state)
});

const mapDispatchToProps = dispatch => ({
  openDialog: value => dispatch(openDialog(value)),
  changeNoteBody: (noteBody, noteId) =>
    dispatch(changeNoteBody(noteBody, noteId)),
  changeNoteBodyInNotesInThisFolder: (noteBody, noteId) =>
    dispatch(changeNoteBodyInNotesInThisFolder(noteBody, noteId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogForEditingNoteBody);
