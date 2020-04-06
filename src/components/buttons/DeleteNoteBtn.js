import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import { connect } from "react-redux"
import { deleteNote } from "../../redux/actions"

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      margin: -6,
    },
  },
}))

const DeleteNoteButton = ({
  noteId,
  deleteNote,
}) => {
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      onClick={() => deleteNote(noteId)}
    >
      <IconButton aria-label="delete">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteNote: (noteId) => dispatch(deleteNote(noteId)),
})

export default connect(null, mapDispatchToProps)(DeleteNoteButton)
