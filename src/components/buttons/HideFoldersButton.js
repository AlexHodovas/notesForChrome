import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { connect } from "react-redux";
import { getIsFoldersHidden } from "../../redux/store";
import { hideFolders } from "../../redux/actions";

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
    marginLeft: 150
  }
}));

const HideFoldersButton = ({ isFoldersHidden, hideFolders }) => {
  const classes = useStyles();

  return (
    <div>
      <StyledButton
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={isFoldersHidden ? <FolderIcon /> : <FolderOpenIcon />}
        onClick={() => hideFolders()}
      >
        {""}
      </StyledButton>
    </div>
  );
};
const mapStateToProps = state => ({
  isFoldersHidden: getIsFoldersHidden(state)
});

const mapDispatchToProps = dispatch => ({
  hideFolders: () => dispatch(hideFolders())
});

export default connect(mapStateToProps, mapDispatchToProps)(HideFoldersButton);
