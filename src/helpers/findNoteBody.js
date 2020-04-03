export default function findNoteBody(notes, selectedNoteIdForEditing) {
  const noteBody = notes.find(note => note.noteId === selectedNoteIdForEditing)
    .noteBody;
  if (noteBody === null) return "";

  return noteBody;
}
