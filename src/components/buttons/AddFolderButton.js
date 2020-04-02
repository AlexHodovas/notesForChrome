import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";

import { userPressAddFolderButton } from "../../redux/actions";

const StyledButton = withStyles({
  root: {
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

const AddFolderButton = ({ userPressAddFolderButton }) => {
  return (
    <div className="addFolderButton">
      <StyledButton
        variant="contained"
        color="default"
        startIcon={<AddCircleIcon />}
        onClick={() => {
          userPressAddFolderButton(true);
        }}
      >
        New&nbsp;Folder
      </StyledButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  userPressAddFolderButton: value => dispatch(userPressAddFolderButton(value))
});

export default connect(null, mapDispatchToProps)(AddFolderButton);
