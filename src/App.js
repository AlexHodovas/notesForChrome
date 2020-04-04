import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { styled, makeStyles, useTheme } from "@material-ui/core/styles";
import AppHeader from "./components/AppHeader";
import Folders from "./components/Folders";
import AddFolderBtn from "./components/buttons/AddFolderBtn";
import Notes from "./components/Notes";

import { getIsFoldersHidden } from "./redux/store";

const Panels = styled(Box)({
  display: "flex"
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: "100px auto",
    width: 1000,
    height: 560,
    border: "1px solid #dfdfdf",
    borderRadius: 10,
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",

    ["@media (max-width:1040px)"]: {// eslint-disable-line no-useless-computed-key
      width: 800,
    },
    ["@media (max-width:820px)"]: {// eslint-disable-line no-useless-computed-key
      width: 550,
    },
    ["@media (max-width:599px)"]: {// eslint-disable-line no-useless-computed-key
      margin: 0,
      height: 870,
      width: "100%",
      backgroundColor: "rgb(228, 226, 229)"
    }
  },
  notesPanel: {
    display: "flex",
    width: "100%",
    ["@media (max-width:820px)"]: {// eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: 406
    }
  },
  notesWhenFoldersHidden: {
    display: "flex",
    width: "100%",

    [theme.breakpoints.between("sm", "820")]: {
      flexDirection: "row"
    }
  },

  folders: {
    width: 310,
    height: 482,
    position: "relative",
    padding: 20,
    borderRight: "1px solid rgb(153, 152, 152)",
    backgroundColor: "rgb(228, 226, 229)",
    borderBottomLeftRadius: 10
  },
  hidden: {
    display: "none"
  }
}));

const App = ({ isFoldersHidden }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  if (!matches) {
    return (
      <div className={classes.root}>
        <AppHeader mobile={true} />
        <Folders mobile={true} />
        <hr />
        <Notes mobile={true} />
      </div>
    );
  } else {
    return (
      <>
        <div className={classes.root}>
          <AppHeader />
          <Panels>
            <div className={isFoldersHidden ? classes.hidden : classes.folders}>
              <Folders />
              <AddFolderBtn />
            </div>
            <div
              className={
                isFoldersHidden
                  ? classes.notesWhenFoldersHidden
                  : classes.notesPanel
              }
            >
              <Notes />
            </div>
          </Panels>
        </div>
      </>
    );
  }
};

const mapStateToProps = state => ({
  isFoldersHidden: getIsFoldersHidden(state)
});

export default connect(mapStateToProps, null)(App);
