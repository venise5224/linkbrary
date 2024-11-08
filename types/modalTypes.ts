import { MouseEvent, ReactNode } from "react";

export interface ModalPropType {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  buttonText?: string;
  buttonColor?: "positive" | "negative";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  folderName?: string;
  list?: FolderItemType[];
  link?: string;
}

// 폴더 데이터 임시 타입 (실제 스웨거와 일치하지 않음)
export interface FolderItemType {
  id: number;
  title: string;
  totalCount: number;
}
