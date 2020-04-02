import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import {
  getSelectedItemIdForDeleting,
  getSelectedFolderIdForEditing,
  getFolders
} from "../../redux/store";
import {
  updateFolderAllNotesWhenDeletingAnotherFolder,
  saveFolderIdForEditing,
  deleteFolder
} from "../../redux/actions";
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: -6
    }
  }
}));

const DeleteFolderButton = ({
  deleteFolder,
  folderId,
  saveFolderIdForEditing,
  folders,
  updateFolderAllNotesWhenDeletingAnotherFolder,
  selectedFolderIdForEditing
}) => {
  const classes = useStyles();

  const findAllNotesInFolderThatWillBeDeleting = () => {
    const folderThatWillBeDeleting = folders.find(
      folder => folder.folderId === selectedFolderIdForEditing
    );

    if (folderThatWillBeDeleting === undefined) {
      return [];
    }
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
    <div
      className={classes.root}
      onClick={() => {
        saveFolderIdForEditing(folderId);

        if (findAllNotesInFolderThatWillBeDeleting().length > 0) {
          if (selectedFolderIdForEditing.includes("folder")) {
            updateFolderAllNotesWhenDeletingAnotherFolder(
              findAllNotesInFolderThatWillBeDeleting(),
              "folderAllNotes"
            );
          }
        }
        deleteFolder(folderId);
      }}
    >
      <IconButton aria-label="delete">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedItemIdForDeleting: getSelectedItemIdForDeleting(state),
  folders: getFolders(state),
  selectedFolderIdForEditing: getSelectedFolderIdForEditing(state)
});

const mapDispatchToProps = dispatch => ({
  updateFolderAllNotesWhenDeletingAnotherFolder: (
    arrayOfIds,
    folderAllNotesId
  ) =>
    dispatch(
      updateFolderAllNotesWhenDeletingAnotherFolder(
        arrayOfIds,
        folderAllNotesId
      )
    ),
  deleteFolder: folderId => dispatch(deleteFolder(folderId)),
  saveFolderIdForEditing: folderId => dispatch(saveFolderIdForEditing(folderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFolderButton);
