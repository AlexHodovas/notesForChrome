import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";

import {
  pressEditFolderNameBtn,
  saveFolderId
} from "../../redux/actions";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      margin: -6,

      ["@media (max-width:599px)"]: {// eslint-disable-line no-useless-computed-key
        marginLeft: 20,
      },
    }
  }
}));

const EditFolderNameBtn = ({
  pressEditFolderNameBtn,
  folderId,
  saveFolderId,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      onClick={() => {
        pressEditFolderNameBtn(true);
        saveFolderId(folderId);
      }}
    >
      <IconButton aria-label="delete">
        <EditIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  pressEditFolderNameBtn: value => dispatch(pressEditFolderNameBtn(value)),
  saveFolderId: folderId => dispatch(saveFolderId(folderId))
});

export default connect(null, mapDispatchToProps)(EditFolderNameBtn);
