export default function allNotesIdInDeletedFolder(
  folders, selectedElementId
) {
  const deletedFolder = folders.find(
    folder => folder.folderId === selectedElementId
  );
  if (!deletedFolder) return [];
  const ids = [];

  for (let i = 0; i < deletedFolder.notesInThisFolder.length; i++) {
    const note = deletedFolder.notesInThisFolder[i];
    ids.push(note.noteId);
  }

  return ids;
};