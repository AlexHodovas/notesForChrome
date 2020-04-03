import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import { styled, makeStyles } from "@material-ui/core/styles";
import AppHeader from "./components/AppHeader";
import Folders from "./components/Folders";
import AddFolderBtn from "./components/buttons/AddFolderBtn";
import Notes from "./components/Notes";

import { getIsFoldersHidden } from "./redux/store";

const AppContainer = styled(Box)({
  margin: "100px auto",
  width: 1000,
  height: 560,
  border: "1px solid #dfdfdf",
  borderRadius: 10,
  boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
});

const Panels = styled(Box)({
  display: "flex"
});

const NotesPanel = styled(Box)({
  display: "flex",
  width: "100%"
});

const useStyles = makeStyles({
  root: {
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
});

const App = ({ isFoldersHidden }) => {
  const classes = useStyles();

  return (
    <AppContainer>
      <AppHeader />
      <Panels>
        <div 
          className={isFoldersHidden ? classes.hidden : classes.root}
        >
          <Folders />
          <AddFolderBtn />
        </div>
        <NotesPanel>
          <Notes />
        </NotesPanel>
      </Panels>
    </AppContainer>
  );
};

const mapStateToProps = state => ({
  isFoldersHidden: getIsFoldersHidden(state)
});

export default connect(mapStateToProps, null)(App);
