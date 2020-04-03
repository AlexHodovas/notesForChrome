import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
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

const AddFolderButton = ({ pressAddFolderBtn }) => (
  <StyledButton
    variant="contained"
    color="default"
    startIcon={<AddCircleIcon />}
    onClick={() => pressAddFolderBtn(true)}
  >
    New&nbsp;Folder
  </StyledButton>
);

const mapDispatchToProps = dispatch => ({
  pressAddFolderBtn: value => dispatch(pressAddFolderBtn(value))
});

export default connect(null, mapDispatchToProps)(AddFolderButton);
