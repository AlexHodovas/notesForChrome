import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import AppHeader from "./components/AppHeader";
import Folders from "./components/Folders";
import AddFolderButton from "./components/buttons/AddFolderButton";
import Notes from "./components/Notes";

import { getIsFoldersHidden } from "./redux/store";

const App = ({ isFoldersHidden }) => (
  <div className="app-container">
    <AppHeader />
    <div className="panels">
      <div
        className={cn("panels__folders", {
          hidden: isFoldersHidden
        })}
      >
        <Folders />
        <AddFolderButton />
      </div>
      <div className="panels__notes">
        <Notes />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  isFoldersHidden: getIsFoldersHidden(state)
});

export default connect(mapStateToProps, null)(App);
