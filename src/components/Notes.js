import React, { useState } from "react"
import { connect } from "react-redux"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import { makeStyles, withStyles, styled } from "@material-ui/core/styles"
import Note from "./Note"
import findNoteBody from "../helpers/findNoteBody"
import ItemTypesForReactDND from "./ItemTypesForReactDND"
import Dialog from "./Dialog"

import {
  getNotes,
  getFolders,
  getIsUserPressAddNoteNameBtn,
  getIsDialogOpened,
  getSelectedNoteIdForEditing,
  getIsFoldersHidden,
  getSelectedFolderIdForEditing,
} from "../redux/store"
import {
  addNote,
  pressAddNoteNameBtn,
  saveNoteId,
  changeNoteBody,
  changeNotesInThisFolder,
  changeNoteBodyInNotesInThisFolder,
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

      ["media (max-width:1040px)"]: { // eslint-disable-line no-useless-computed-key
        width: 240,
      },
      ["@media (max-width:820px)"]: { // eslint-disable-line no-useless-computed-key
        width: 300,
        height: 120,
      },
      ["@media (max-width:600px)"]: { // eslint-disable-line no-useless-computed-key
        width: "54vw",
        height: 222,
      },
      ["@media (max-width:599px)"]: { // eslint-disable-line no-useless-computed-key
        width: "99vw",
        borderBottomLeftRadius: 10,
      },
    },
    "& .MuiInputBase-inputMultiline": {
      height: 446,

      ["@media (max-width:820px)"]: { // eslint-disable-line no-useless-computed-key
        paddingTop: 10,
        height: 80,
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
       width: 497,
      },

      ["@media (max-width:820px)"]: { // eslint-disable-line no-useless-computed-key
        width: 246,
        height: 522,
      },

      ["@media (max-width:600px)"]: { // eslint-disable-line no-useless-computed-key
        width: 261,
      },
    },

    "& .MuiInputBase-inputMultiline": {
      ["@media (max-width:820px)"]: { // eslint-disable-line no-useless-computed-key
        height: 454,
       },
    }
  }
}))(TextField)

const Notes = ({
  notes,
  folders,
  isUserPressAddNoteNameBtn,
  pressAddNoteNameBtn,
  addNoteFromProps,
  isDialogOpened,
  saveNoteId,
  changeNoteBody,
  selectedNoteIdForEditing,
  isFoldersHidden,
  changeNotesInThisFolder,
  changeNoteBodyInNotesInThisFolder,
  selectedFolderIdForEditing,
  mobile,
}) => {
  const classes = useStyles()
  const [currentNote, setCurrentNote] = useState({
    noteId: null,
    noteName: null,
    noteBody: null,
    type: ItemTypesForReactDND.BOX,
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
    changeNoteBody(value, selectedNoteIdForEditing)
    changeNoteBodyInNotesInThisFolder(value, selectedNoteIdForEditing)
  }

  const isItAllNotesFolder = () => {
    const folderAllNotes = folders.filter(
      (folder) =>
        folder.folderId === selectedFolderIdForEditing &&
        folder.folderId === "folderAllNotes"
    );
    const [folder] = folderAllNotes
    if (!folder) return false

    return true
  }

  const notesInThisFolder = () => {
    const folderAll = folders[0]
    const notesInThisFolderInFolderAll = folderAll.notesInThisFolder
    const needFolder = folders.filter(
      folder => folder.folderId === selectedFolderIdForEditing
    )
    const [folder] = needFolder
    if (!folder) return notesInThisFolderInFolderAll
    const { notesInThisFolder } = folder
    if (notesInThisFolder) return notesInThisFolder

    return []
  }

  return (
    <>
      {isUserPressAddNoteNameBtn && notesInThisFolder().length < 1 && (
        <input
          autoFocus
          type="text"
          maxLength="30"
          placeholder="New Note"
          className={classes.firstNoteinput}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={() => {
            pressAddNoteNameBtn(false)
            if(currentNote.noteName === null) return
            addNoteFromProps(currentNote)
            setCurrentNote({
              noteId: null,
              noteName: null,
              noteBody: null,
              type: ItemTypesForReactDND.BOX
            })
            saveNoteId(currentNote.noteId)

            if (isItAllNotesFolder()) {
              changeNotesInThisFolder("folderAllNotes", currentNote)
            } else {
              changeNotesInThisFolder("folderAllNotes", currentNote)
              changeNotesInThisFolder(selectedFolderIdForEditing, currentNote)
            }
          }}
        />
      )}
      {notesInThisFolder().length > 0 && (
        <>
          <div className={classes.root}>
            <ul>
              {notesInThisFolder().map((note) => (
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
                      if(currentNote.noteName === null) return
                      addNoteFromProps(currentNote)
                      saveNoteId(currentNote.noteId)

                      if (isItAllNotesFolder()) {
                        changeNotesInThisFolder("folderAllNotes", currentNote)
                      } else {
                        changeNotesInThisFolder("folderAllNotes", currentNote)
                        changeNotesInThisFolder(
                          selectedFolderIdForEditing,
                          currentNote
                        )
                      }
                    }}
                  />
                </div>
              )}
            </ul>
            {isDialogOpened && <Dialog />}
          </div>
          {notes.find((note) => note.noteId === selectedNoteIdForEditing) && (
            <NoteBodyWrapper>
              <form className={classes.root} noValidate autoComplete="off">
                {!isFoldersHidden && (
                  <TextField
                    rows="22"
                    multiline
                    label="Note"
                    variant="outlined"
                    id="outlined-multiline-static"
                    value={findNoteBody(notes, selectedNoteIdForEditing)}
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
                    value={findNoteBody(notes, selectedNoteIdForEditing)}
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
  notes: getNotes(state),
  folders: getFolders(state),
  isUserPressAddNoteNameBtn: getIsUserPressAddNoteNameBtn(state),
  isDialogOpened: getIsDialogOpened(state),
  selectedNoteIdForEditing: getSelectedNoteIdForEditing(state),
  isFoldersHidden: getIsFoldersHidden(state),
  selectedFolderIdForEditing: getSelectedFolderIdForEditing(state),
});

const mapDispatchToProps = (dispatch) => ({
  addNoteFromProps: (note) => dispatch(addNote(note)),
  pressAddNoteNameBtn: (value) => dispatch(pressAddNoteNameBtn(value)),
  saveNoteId: (noteId) => dispatch(saveNoteId(noteId)),
  changeNoteBody: (noteBody, noteId) =>
    dispatch(changeNoteBody(noteBody, noteId)),
  changeNotesInThisFolder: (folderId, note) =>
    dispatch(changeNotesInThisFolder(folderId, note)),
  changeNoteBodyInNotesInThisFolder: (noteBody, noteId) =>
    dispatch(changeNoteBodyInNotesInThisFolder(noteBody, noteId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
