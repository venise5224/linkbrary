import axiosInstance from "@/lib/api/axiosInstanceApi";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.accessToken;
  const { folderId } = req.query;
  const id = Number(folderId);

  console.log("Token:", token);
  console.log("folderId:", folderId);

  if (!token) {
    return res.status(401).json({ error: "사용자 정보를 찾을 수 없습니다." });
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid folderId" });
  }

  if (req.method === "DELETE") {
    try {
      const response = await axiosInstance.delete(`/folders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.status(204).json({ message: "폴더 삭제 성공" });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "알 수 없는 오류 발생";
        return res.status(status).json({ message });
      }
    }
  } else {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};
export default handler;
