import axiosInstance, { proxy } from "./axiosInstanceApi";

interface folderApiProps {
  name: string;
}

// 유저의 모든 폴더 조회(auth)
export const getFolders = async () => {
  try {
    const res = await proxy.get("/api/folders");
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 유저의 폴더 생성(auth)
export const postFolders = async (body: folderApiProps) => {
  try {
    const res = await proxy.post("/api/folders", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 폴더 조회
export const getFolder = async (folderId: number) => {
  try {
    const res = await axiosInstance.get(`/folders/${folderId}`);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 폴더 삭제(auth)
export const deleteFolder = async (folderId: number) => {
  try {
    const res = await proxy.delete(`/api/folders/${folderId}`);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
    throw err;
  }
};

// 폴더 이름 수정(auth)
export const putFolder = async (folderId: number, body: folderApiProps) => {
  try {
    const res = await proxy.put(`/api/folders/${folderId}`, body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};
