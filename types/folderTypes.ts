export interface FolderData {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

export interface FolderListData {
  folderList: FolderData[];
}
