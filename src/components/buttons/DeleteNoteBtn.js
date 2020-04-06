import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import { connect } from "react-redux"
import { deleteNote, deleteNoteInNotesInThisFolder } from "../../redux/actions"

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      margin: -6,
    },
  },
}))

const DeleteNoteButton = ({
  deleteNote,
  noteId,
  deleteNoteInNotesInThisFolder,
}) => {
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      onClick={() => {
        deleteNote(noteId)
        deleteNoteInNotesInThisFolder(noteId)
      }}
    >
      <IconButton aria-label="delete">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteNote: (noteId) => dispatch(deleteNote(noteId)),
  deleteNoteInNotesInThisFolder: (noteId) =>
    dispatch(deleteNoteInNotesInThisFolder(noteId)),
})

export default connect(null, mapDispatchToProps)(DeleteNoteButton)
