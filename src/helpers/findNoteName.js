export default function findNoteName(notes, selectedNoteIdForEditing) {
  const noteName = notes.find((note) => note.noteId === selectedNoteIdForEditing).noteName
  if (noteName === null) return ""

  return noteName
}