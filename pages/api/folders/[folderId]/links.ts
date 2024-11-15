import axiosInstance from "@/lib/api/axiosInstanceApi";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.accessToken;
  const { page, pageSize, folderId } = req.query;

  if (!token) {
    return res.status(401).json({ error: "사용자 정보를 찾을 수 없습니다." });
  }

  if (!folderId) {
    return res.status(400).json({ error: "유효하지 않은 폴더 ID 입니다" });
  }

  switch (req.method) {
    case "GET":
      try {
        await axiosInstance.get(`/folders/${folderId}/links`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            pageSize: pageSize,
          },
        });
        return res
          .status(204)
          .json({ message: "폴더에 해당하는 링크 조회 성공" });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const message =
            error.response.data?.message || "알 수 없는 오류 발생";
          return res.status(status).json({ message });
        }
      }
  }
};
export default handler;
