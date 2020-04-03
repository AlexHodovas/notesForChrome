import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import allNotesIdInDeletedFolder from "../../helpers/allNotesIdInDeletedFolder";
import {
  getSelectedItemIdForDeleting,
  getSelectedFolderIdForEditing,
  getFolders
} from "../../redux/store";
import {
  updateFolderAll,
  saveFolderId,
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
  folders,
  updateFolderAll,
  saveFolderId,
  selectedFolderIdForEditing
}) => {
  const classes = useStyles();

  const checkNeedFolderUpdate = () => {
    if (
      allNotesIdInDeletedFolder(folders, selectedFolderIdForEditing).length > 0
    ) {
      updateFolderAll(
        allNotesIdInDeletedFolder(folders, selectedFolderIdForEditing),
        "folderAllNotes"
      );
    }
  };

  return (
    <div
      className={classes.root}
      onClick={() => {
        saveFolderId(folderId);
        checkNeedFolderUpdate();
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
  updateFolderAll: (arrayOfIds, folderAllNotesId) =>
    dispatch(updateFolderAll(arrayOfIds, folderAllNotesId)),
  deleteFolder: folderId => dispatch(deleteFolder(folderId)),
  saveFolderId: folderId => dispatch(saveFolderId(folderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFolderButton);
