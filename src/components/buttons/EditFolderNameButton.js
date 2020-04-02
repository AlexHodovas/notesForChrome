import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";

import {
  userPressEditFolderNameButton,
  saveFolderIdForEditing
} from "../../redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: -6
    }
  }
}));

const EditFolderNameButton = ({
  userPressEditFolderNameButton,
  folderId,
  saveFolderIdForEditing
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      onClick={() => {
        userPressEditFolderNameButton(true);
        saveFolderIdForEditing(folderId);
      }}
    >
      <IconButton aria-label="delete">
        <EditIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  userPressEditFolderNameButton: value =>
    dispatch(userPressEditFolderNameButton(value)),
  saveFolderIdForEditing: folderId => dispatch(saveFolderIdForEditing(folderId))
});

export default connect(null, mapDispatchToProps)(EditFolderNameButton);
