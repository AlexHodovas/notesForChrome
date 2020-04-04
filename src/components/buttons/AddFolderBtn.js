import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";

import { pressAddFolderBtn } from "../../redux/actions";


const StyledButton = withStyles({
  root: {
    position: "absolute",
    bottom: 15,
    backgroundColor: "rgb(228, 226, 229)",
    boxShadow: "none",
    border: "none",
    textTransform: "none",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "rgb(228, 226, 229)",
      border: "none",
      boxShadow: "none"
    }
  },
  label: {
    padding: 0,
    alignItems: "none"
  }
})(Button);

const useStyles = makeStyles({
  root: {
    position: 'static',
    marginLeft: 10,
  },
});

const AddFolderButton = ({ pressAddFolderBtn, mobile }) => {
  const classes = useStyles();

  if (mobile) {
    return (
      <StyledButton
        variant="contained"
        color="default"
        startIcon={<AddCircleIcon />}
        onClick={() => pressAddFolderBtn(true)}
        className={classes.root}
      >
        New&nbsp;Folder
      </StyledButton>
    );
  } else {
    return (
      <StyledButton
        variant="contained"
        color="default"
        startIcon={<AddCircleIcon />}
        onClick={() => pressAddFolderBtn(true)}
      >
        New&nbsp;Folder
      </StyledButton>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  pressAddFolderBtn: value => dispatch(pressAddFolderBtn(value))
});

export default connect(null, mapDispatchToProps)(AddFolderButton);
