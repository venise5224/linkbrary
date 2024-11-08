import { ReactNode } from "react";

export interface ModalPropType {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  buttonText?: string;
  buttonColor?: "positive" | "negative";
  onClick?: () => void;
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
