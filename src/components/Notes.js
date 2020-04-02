import React, { useState } from "react";
import { connect } from "react-redux";
import DialogForEditingNoteBody from "./DialogForEditingNoteBody";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ItemTypesForReactDND from "./ItemTypesForReactDND";
import Note from "./Note";
import {
  getNotes,
  getFolders,
  getIsUserPressAddNoteNameBtn,
  getIsDialogForNoteBodyEditingOpened,
  getSelectedNoteIdForEditing,
  getIsFoldersHidden,
  getSelectedFolderIdForEditing
} from "../redux/store";
import {
  addNote,
  userPressAddNoteNameButton,
  changeNoteName,
  saveNoteIdForEditing,
  changeNoteBody,
  changeNotesInThisFolder,
  changeNoteBodyInNotesInThisFolder
} from "../redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: 0
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      paddingTop: 0,
      width: 410,
      height: 523,
      borderBottomRightRadius: 10
    }
  }
}));

const StyledTextFieldWhenFoldersHidden = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      width: 677
    }
  }
})(TextField);

const Notes = ({
  notes,
  folders,
  isUserPressAddNoteNameBtn,
  userPressAddNoteNameButton,
  addNoteFromProps,
  isDialogForNoteBodyEditingOpened,
  saveNoteIdForEditing,
  changeNoteBody,
  selectedNoteIdForEditing,
  isFoldersHidden,
  changeNotesInThisFolder,
  changeNoteBodyInNotesInThisFolder,
  selectedFolderIdForEditing
}) => {
  const classes = useStyles();

  const [currentNote, setCurrentNote] = useState({
    noteId: null,
    noteName: null,
    noteBody: null,
    type: ItemTypesForReactDND.BOX
  });

  const handleInputChange = value => {
    setCurrentNote(prevState => {
      return {
        ...prevState,
        noteId: `noteId-${+new Date()}`,
        noteName: value
      };
    });
  };

  const handleTextFieldChange = (value, noteId) => {
    changeNoteBody(value, selectedNoteIdForEditing);
    changeNoteBodyInNotesInThisFolder(value, selectedNoteIdForEditing);
  };

  const isItAllNotesFolder = () => {
    const folderAllNotes = folders.filter(
      folder =>
        folder.folderId === selectedFolderIdForEditing &&
        folder.folderId === "folderAllNotes"
    );
    const [folder] = folderAllNotes;

    if (folder === undefined) {
      return false;
    } else {
      return true;
    }
  };

  const notesInThisFolder = () => {
    const folderAll = folders[0];
    const notesInThisFolderInFolderAll = folderAll.notesInThisFolder;
    const needFolder = folders.filter(
      folder => folder.folderId === selectedFolderIdForEditing
    );
    const [folder] = needFolder;
    if (folder === undefined) {
      return notesInThisFolderInFolderAll;
    }
    const { notesInThisFolder } = folder;

    if (notesInThisFolder !== undefined) {
      return notesInThisFolder;
    } else {
      return [];
    }
  };

  return (
    <>
      {isUserPressAddNoteNameBtn && notesInThisFolder().length < 1 && (
        <input
          maxLength="30"
          autoFocus
          placeholder="New Note"
          onChange={e => handleInputChange(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              addNoteFromProps(currentNote);
              userPressAddNoteNameButton(false);
              setCurrentNote({
                noteId: null,
                noteName: null,
                noteBody: null,
                type: ItemTypesForReactDND.BOX
              });
              saveNoteIdForEditing(currentNote.noteId);

              if (isItAllNotesFolder()) {
                changeNotesInThisFolder("folderAllNotes", currentNote);
              } else {
                changeNotesInThisFolder("folderAllNotes", currentNote);
                changeNotesInThisFolder(
                  selectedFolderIdForEditing,
                  currentNote
                );
              }
            }
          }}
          type="text"
          className="firstNoteinput"
        />
      )}
      {notesInThisFolder().length > 0 && (
        <>
          <div className="notes">
            <ul className="ul">
              {notesInThisFolder().map(note => (
                <Note note={note} key={note.noteId} />
              ))}
              {isUserPressAddNoteNameBtn && (
                <div>
                  <input
                    maxLength="20"
                    autoFocus
                    placeholder="New Note"
                    onChange={e => handleInputChange(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        addNoteFromProps(currentNote);
                        userPressAddNoteNameButton(false);
                        saveNoteIdForEditing(currentNote.noteId);

                        if (isItAllNotesFolder()) {
                          changeNotesInThisFolder(
                            "folderAllNotes",
                            currentNote
                          );
                        } else {
                          changeNotesInThisFolder(
                            "folderAllNotes",
                            currentNote
                          );
                          changeNotesInThisFolder(
                            selectedFolderIdForEditing,
                            currentNote
                          );
                        }
                      }
                    }}
                    type="text"
                    className="folderNameInputWhenFoldersLengthMoreThanOne"
                  />
                </div>
              )}
            </ul>

            {isDialogForNoteBodyEditingOpened && <DialogForEditingNoteBody />}
          </div>
          {notes.find(note => note.noteId === selectedNoteIdForEditing) && (
            <div className="note__body">
              <form className={classes.root} noValidate autoComplete="off">
                {!isFoldersHidden && (
                  <TextField
                    id="outlined-multiline-static"
                    label="Note"
                    multiline
                    rows="22"
                    variant="outlined"
                    className={classes.root}
                    value={
                      notes.find(
                        note => note.noteId === selectedNoteIdForEditing
                      ).noteBody === null
                        ? ""
                        : notes.find(
                            note => note.noteId === selectedNoteIdForEditing
                          ).noteBody
                    }
                    onChange={e => handleTextFieldChange(e.target.value)}
                  />
                )}

                {isFoldersHidden && (
                  <StyledTextFieldWhenFoldersHidden
                    id="outlined-multiline-static"
                    label="Note"
                    multiline
                    rows="22"
                    variant="outlined"
                    className={classes.root}
                    value={
                      notes.find(
                        note => note.noteId === selectedNoteIdForEditing
                      ).noteBody === null
                        ? ""
                        : notes.find(
                            note => note.noteId === selectedNoteIdForEditing
                          ).noteBody
                    }
                    onChange={e => handleTextFieldChange(e.target.value)}
                  />
                )}
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  notes: getNotes(state),
  folders: getFolders(state),
  isUserPressAddNoteNameBtn: getIsUserPressAddNoteNameBtn(state),
  isDialogForNoteBodyEditingOpened: getIsDialogForNoteBodyEditingOpened(state),
  selectedNoteIdForEditing: getSelectedNoteIdForEditing(state),
  isFoldersHidden: getIsFoldersHidden(state),
  selectedFolderIdForEditing: getSelectedFolderIdForEditing(state)
});

const mapDispatchToProps = dispatch => ({
  addNoteFromProps: note => dispatch(addNote(note)),
  userPressAddNoteNameButton: value =>
    dispatch(userPressAddNoteNameButton(value)),
  changeFolderName: (noteName, noteId) =>
    dispatch(changeNoteName(noteName, noteId)),
  saveNoteIdForEditing: noteId => dispatch(saveNoteIdForEditing(noteId)),
  changeNoteBody: (noteBody, noteId) =>
    dispatch(changeNoteBody(noteBody, noteId)),
  changeNotesInThisFolder: (folderId, note) =>
    dispatch(changeNotesInThisFolder(folderId, note)),
  changeNoteBodyInNotesInThisFolder: (noteBody, noteId) =>
    dispatch(changeNoteBodyInNotesInThisFolder(noteBody, noteId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
