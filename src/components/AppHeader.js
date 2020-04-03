import React from "react";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import DotButtonsSimulation from "./buttons/DotButtonsSimulation";
import HideFoldersBtn from "./buttons/HideFoldersBtn";
import DeleteSelectedItemBtn from "./buttons/DeleteSelectedItemBtn";
import AddNote from "./buttons/AddNoteBtn";

const AppHeaderWrapper = styled(Box)({
  display: "flex",
  backgroundColor: "rgb(228, 226, 229)",
  height: 38,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  borderBottom: "1px solid rgb(190, 190, 190)"
});

const AppHeader = () => (
  <AppHeaderWrapper>
    <DotButtonsSimulation />
    <HideFoldersBtn />
    <DeleteSelectedItemBtn />
    <AddNote />
  </AppHeaderWrapper>
);

export default AppHeader;
