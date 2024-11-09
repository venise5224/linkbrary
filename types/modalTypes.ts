import { ReactNode } from "react";

export interface ModalPropType {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  folderName?: string;
  list?: FolderItemType[];
  link?: string;
}

export interface FolderItemType {
  id: number;
  createAt: string;
  name: string;
  linkCount: number;
}
