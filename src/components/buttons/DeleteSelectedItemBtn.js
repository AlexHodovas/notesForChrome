import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import allNotesIdInDeletedFolder from "../../helpers/allNotesIdInDeletedFolder"

import {
  getSelectedItemIdForDeleting,
  getSelectedFolderIdForEditing,
  getFolders,
} from "../../redux/store"
import { deleteSelectedItem, updateFolderAll } from "../../redux/actions"

const StyledButton = withStyles({
  root: {
    border: 0,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 0,
    minWidth: 38,
    backgroundColor: "white",
  },
  label: {
    padding: 0,
  },
})(Button)

const useStyles = makeStyles({
  button: {
    marginTop: 6,
    marginLeft: 8,
  },
  mobileButton: {
    marginTop: 6,
    marginLeft: 30,
    marginRight: 20,
  },
})

const DeleteSelectedItem = ({
  deleteSelectedItem,
  selectedItemIdForDeleting,
  folders,
  updateFolderAll,
  mobile,
}) => {
  const classes = useStyles()

  const checkNeedFolderUpdate = () => {
    if (selectedItemIdForDeleting.includes("folder")) {
      updateFolderAll(
        allNotesIdInDeletedFolder(folders, selectedItemIdForDeleting),
        "folderAllNotes"
      )
    }
  }

  return (
    <div>
      <StyledButton
        variant="contained"
        color="default"
        className={mobile ? classes.mobileButton : classes.button}
        startIcon={<DeleteForeverIcon />}
        onClick={() => {
          checkNeedFolderUpdate()
          deleteSelectedItem(selectedItemIdForDeleting)
        }}
      >
        {""}
      </StyledButton>
    </div>
  )
}
const mapStateToProps = (state) => ({
  selectedItemIdForDeleting: getSelectedItemIdForDeleting(state),
  folders: getFolders(state),
  selectedFolderIdForEditing: getSelectedFolderIdForEditing(state),
})

const mapDispatchToProps = (dispatch) => ({
  deleteSelectedItem: (selectedItemId) =>
    dispatch(deleteSelectedItem(selectedItemId)),
  updateFolderAll: (arrayOfIds, folderAllNotesId) =>
    dispatch(updateFolderAll(arrayOfIds, folderAllNotesId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSelectedItem)
