import React, { useState } from "react"
import { connect } from "react-redux"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import { makeStyles, withStyles, styled } from "@material-ui/core/styles"
import Note from "./Note"
import findNoteBody from "../helpers/findNoteBody"
import notesInThisFolder from "../helpers/notesInThisFolder"
import Dialog from "./Dialog"

import {
  getFolders,
  getIsUserPressAddNoteNameBtn,
  getIsDialogOpened,
  getSelectedNoteId,
  getIsFoldersHidden,
  getSelectedFolderId,
} from "../redux/store"
import {
  pressAddNoteNameBtn,
  saveNoteId,
  addNote,
  changeNoteBody,
} from "../redux/actions"

const NoteBodyWrapper = styled(Box)({
  borderLeft: "1px solid rgb(153, 152, 152)",
})

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      margin: 0,
      ["@media (max-width:599px)"]: { // eslint-disable-line no-useless-computed-key
        marginTop: 20,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      paddingTop: 0,
      width: 428,
      height: 523,
      borderBottomRightRadius: 10,

      ["@media (max-width:1040px)"]: { // eslint-disable-line no-useless-computed-key
        width: 303,
        height: 82,
      },
      ["@media (max-width:820px)"]: { // eslint-disable-line no-useless-computed-key
        height: 121,
      },
      ["@media (max-width:600px)"]: { // eslint-disable-line no-useless-computed-key
        width: "51vw",
        height: 222,
      },
      ["@media (max-width:599px)"]: { // eslint-disable-line no-useless-computed-key
        width: "99vw",
        borderBottomLeftRadius: 10,
      },
    },
    "& .MuiInputBase-inputMultiline": {
      height: 446,

      ["@media (max-width:1040px)"]: { // eslint-disable-line no-useless-computed-key
        paddingTop: 10,
        height: 50,
      },
      ["@media (max-width:600px)"]: { // eslint-disable-line no-useless-computed-key
        paddingTop: 20,
        height: 176,
      },
    }
  },
  firstNoteinput: {
    marginTop: 20,
    width: 240,
    height: 26,
    fontSize: 14,

    ["@media (max-width:599px)"]: { // eslint-disable-line no-useless-computed-key
      width: "94%",
      display: "block",
      fontSize: 16,
      padding: 5,
      paddingLeft: 20,
    },
    ["@media (max-width:460px)"]: { // eslint-disable-line no-useless-computed-key
      width: "88vw",
    },
    ["@media (max-width:360px)"]: { // eslint-disable-line no-useless-computed-key
      width: "86vw",
    },
  },
  input: {
    width: "96%",
    display: "block",
    fontSize: 14,
    height: 26,

    ["@media (max-width:599px)"]: { // eslint-disable-line no-useless-computed-key
      width: "94%",
      display: "block",
      fontSize: 16,
      padding: 5,
      paddingLeft: 20,
    },
    ["@media (max-width:500px)"]: { // eslint-disable-line no-useless-computed-key
      width: "88vw",
    },
  }
}));

const StyledTextFieldWhenFoldersHidden = withStyles(() => ({
  root: {
    "& .MuiOutlinedInput-root": {
      width: 698,

      ["@media (max-width:1040px)"]: { // eslint-disable-line no-useless-computed-key
       width: 247,
       height: 522,
      },

      ["@media (max-width:600px)"]: { // eslint-disable-line no-useless-computed-key
        width: 261,
      },
    },

    "& .MuiInputBase-inputMultiline": {
      ["@media (max-width:1040px)"]: { // eslint-disable-line no-useless-computed-key
        paddingTop: 10,
        height: 446,
      },

      ["@media (max-width:820px)"]: { // eslint-disable-line no-useless-computed-key
        height: 454,
       },
    }
  }
}))(TextField)

const Notes = ({
  folders,
  isUserPressAddNoteNameBtn,
  pressAddNoteNameBtn,
  isDialogOpened,
  saveNoteId,
  selectedNoteId,
  isFoldersHidden,
  addNote,
  changeNoteBody,
  selectedFolderId,
  mobile,
}) => {
  const classes = useStyles()
  const [currentNote, setCurrentNote] = useState({
    noteId: null,
    noteName: null,
    noteBody: null,
  })

  const handleInputChange = (value) => {
    setCurrentNote((prevState) => {
      return {
        ...prevState,
        noteId: `noteId-${+new Date()}`,
        noteName: value,
      }
    })
  }

  const handleTextFieldChange = (value) => {
    changeNoteBody(value, selectedNoteId)
  }

  const isItAllNotesFolder = () => {
    const folderAllNotes = folders.filter(
      (folder) =>
        folder.folderId === selectedFolderId &&
        folder.folderId === "folderAllNotes"
    );
    const [folder] = folderAllNotes
    if (!folder) return false

    return true
  }
  const notes = notesInThisFolder(folders, selectedFolderId);

  return (
    <>
      {isUserPressAddNoteNameBtn && notes.length < 1 && (
        <input
          autoFocus
          type="text"
          maxLength="30"
          placeholder="New Note"
          className={classes.firstNoteinput}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={() => {
            pressAddNoteNameBtn(false)

            if (
              currentNote.noteName === null ||
              currentNote.noteName.trim() === ""
            ) {
              return
            }
            
            setCurrentNote({
              noteId: null,
              noteName: null,
              noteBody: null,
            })
            saveNoteId(currentNote.noteId)

            if (isItAllNotesFolder()) {
              addNote("folderAllNotes", currentNote)
            } else {
              addNote("folderAllNotes", currentNote)
              addNote(selectedFolderId, currentNote)
            }
          }}
        />
      )}
      {notes.length > 0 && (
        <>
          <div className={classes.root}>
            <ul>
              {notes.map((note) => (
                <Note note={note} key={note.noteId} mobile={mobile} />
              ))}
              {isUserPressAddNoteNameBtn && (
                <div>
                  <input
                    autoFocus
                    type="text"
                    maxLength="30"
                    placeholder="New Note"
                    className={classes.input}
                    onChange={e => handleInputChange(e.target.value)}
                    onBlur={() => {
                      pressAddNoteNameBtn(false)

                      if (
                        currentNote.noteName === null ||
                        currentNote.noteName.trim() === ""
                      ) {
                        return
                      }
                      saveNoteId(currentNote.noteId)

                      if (isItAllNotesFolder()) {
                        addNote("folderAllNotes", currentNote)
                      } else {
                        addNote("folderAllNotes", currentNote)
                        addNote(selectedFolderId,currentNote)
                      }
                    }}
                  />
                </div>
              )}
            </ul>
            {isDialogOpened && <Dialog />}
          </div>
          {notes.find((note) => note.noteId === selectedNoteId) && (
            <NoteBodyWrapper>
              <form className={classes.root} noValidate autoComplete="off">
                {!isFoldersHidden && (
                  <TextField
                    rows="22"
                    multiline
                    label="Note"
                    variant="outlined"
                    id="outlined-multiline-static"
                    value={findNoteBody(notes, selectedNoteId)}
                    onChange={(e) => handleTextFieldChange(e.target.value)}
                  />
                )}

                {isFoldersHidden && (
                  <StyledTextFieldWhenFoldersHidden
                    rows="22"
                    multiline
                    label="Note"
                    variant="outlined"
                    id="outlined-multiline-static"
                    value={findNoteBody(notes, selectedNoteId)}
                    onChange={(e) => handleTextFieldChange(e.target.value)}
                  />
                )}
              </form>
            </NoteBodyWrapper>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  folders: getFolders(state),
  isUserPressAddNoteNameBtn: getIsUserPressAddNoteNameBtn(state),
  isDialogOpened: getIsDialogOpened(state),
  isFoldersHidden: getIsFoldersHidden(state),
  selectedFolderId: getSelectedFolderId(state),
  selectedNoteId: getSelectedNoteId(state),
});

const mapDispatchToProps = (dispatch) => ({
  pressAddNoteNameBtn: (value) => dispatch(pressAddNoteNameBtn(value)),
  saveNoteId: (noteId) => dispatch(saveNoteId(noteId)),
  addNote: (folderId, note) => dispatch(addNote(folderId, note)),
  changeNoteBody: (noteBody, noteId) => dispatch(changeNoteBody(noteBody, noteId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
