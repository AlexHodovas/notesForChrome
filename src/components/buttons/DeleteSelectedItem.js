import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import {
  getSelectedItemIdForDeleting,
  getSelectedFolderIdForEditing,
  getFolders
} from "../../redux/store";
import {
  deleteSelectedItem,
  updateFolderAllNotesWhenDeletingAnotherFolder
} from "../../redux/actions";

const StyledButton = withStyles({
  root: {
    border: 0,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 0,
    minWidth: 38,
    backgroundColor: "white"
  },
  label: {
    padding: 0
  }
})(Button);

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 6,
    marginLeft: 8
  }
}));

const DeleteSelectedItem = ({
  deleteSelectedItem,
  selectedItemIdForDeleting,
  folders,
  updateFolderAllNotesWhenDeletingAnotherFolder
}) => {
  const classes = useStyles();

  const fildAllNotesInFolderThatWillBeDeleting = () => {
    const folderThatWillBeDeleting = folders.find(
      folder => folder.folderId === selectedItemIdForDeleting
    );
    const noteIdsNotesThanWillBeDeleting = [];

    for (
      let i = 0;
      i < folderThatWillBeDeleting.notesInThisFolder.length;
      i++
    ) {
      const note = folderThatWillBeDeleting.notesInThisFolder[i];
      noteIdsNotesThanWillBeDeleting.push(note.noteId);
    }

    return noteIdsNotesThanWillBeDeleting;
  };

  return (
    <div>
      <StyledButton
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<DeleteForeverIcon />}
        onClick={() => {
          if (selectedItemIdForDeleting.includes("folder")) {
            console.log(fildAllNotesInFolderThatWillBeDeleting());
            updateFolderAllNotesWhenDeletingAnotherFolder(
              fildAllNotesInFolderThatWillBeDeleting(),
              "folderAllNotes"
            );
          }
          deleteSelectedItem(selectedItemIdForDeleting);
        }}
      >
        {""}
      </StyledButton>
    </div>
  );
};
const mapStateToProps = state => ({
  selectedItemIdForDeleting: getSelectedItemIdForDeleting(state),
  folders: getFolders(state),
  selectedFolderIdForEditing: getSelectedFolderIdForEditing(state)
});

const mapDispatchToProps = dispatch => ({
  deleteSelectedItem: selectedItemId =>
    dispatch(deleteSelectedItem(selectedItemId)),
  updateFolderAllNotesWhenDeletingAnotherFolder: (
    arrayOfIds,
    folderAllNotesId
  ) =>
    dispatch(
      updateFolderAllNotesWhenDeletingAnotherFolder(
        arrayOfIds,
        folderAllNotesId
      )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSelectedItem);
