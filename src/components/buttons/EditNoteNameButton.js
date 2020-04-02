import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";

import {
  userPressEditNoteNameButton,
  saveNoteIdForEditing
} from "../../redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: -6
    }
  }
}));

const EditNoteNameButton = ({
  noteId,
  userPressEditNoteNameButton,
  saveNoteIdForEditing
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      onClick={
        () => {
          userPressEditNoteNameButton(true);
          saveNoteIdForEditing(noteId);
        }
      }
    >
      <IconButton aria-label="delete">
        <EditIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  userPressEditNoteNameButton: value => dispatch(userPressEditNoteNameButton(value)),
  saveNoteIdForEditing: noteId => dispatch(saveNoteIdForEditing(noteId)),
});

export default connect(
  null,
  mapDispatchToProps
)(EditNoteNameButton);
