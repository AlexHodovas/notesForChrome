import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { connect } from "react-redux";

import { userPressAddNoteNameButton } from "../../redux/actions";

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

const AddNote = ({ userPressAddNoteNameButton }) => {
  const classes = useStyles();

  return (
    <div>
      <StyledButton
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<NoteAddIcon />}
        onClick={() => {
          userPressAddNoteNameButton(true);
        }}
      >
        {""}
      </StyledButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  userPressAddNoteNameButton: value =>
    dispatch(userPressAddNoteNameButton(value))
});

export default connect(null, mapDispatchToProps)(AddNote);
