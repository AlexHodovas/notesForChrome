export default function notesInThisFolder(folders, selectedFolderId){
  const folderAll = folders[0]
  const notesInThisFolderInFolderAll = folderAll.notesInThisFolder
  const needFolder = folders.filter(
    folder => folder.folderId === selectedFolderId
  )
  const [folder] = needFolder
  if (!folder) return notesInThisFolderInFolderAll
  const { notesInThisFolder } = folder
  if (notesInThisFolder) return notesInThisFolder

  return []
}
