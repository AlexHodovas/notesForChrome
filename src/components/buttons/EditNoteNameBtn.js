import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";

import { pressEditNoteNameBtn, saveNoteId } from "../../redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: -6,

      ["@media (max-width:599px)"]: {// eslint-disable-line no-useless-computed-key
        marginLeft: 20,
      },
    }
  }
}));

const EditNoteNameBtn = ({ noteId, pressEditNoteNameBtn, saveNoteId }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      onClick={() => {
        pressEditNoteNameBtn(true);
        saveNoteId(noteId);
      }}
    >
      <IconButton aria-label="delete">
        <EditIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  pressEditNoteNameBtn: value => dispatch(pressEditNoteNameBtn(value)),
  saveNoteId: noteId => dispatch(saveNoteId(noteId))
});

export default connect(null, mapDispatchToProps)(EditNoteNameBtn);
