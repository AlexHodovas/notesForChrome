import React from "react";
import DotButtonsSimulation from './buttons/DotButtonsSimulation';
import HideFoldersButton from './buttons/HideFoldersButton';
import DeleteSelectedItem from './buttons/DeleteSelectedItem';
import AddNote from './buttons/AddNote';

const AppHeader = () => (
  <div className="app-header">
    <DotButtonsSimulation />
    <HideFoldersButton />
    <DeleteSelectedItem />
    <AddNote />
  </div>
)

export default AppHeader;