import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axiosInstance from "@/lib/api/axiosInstanceApi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  let folderId;
  switch (req.method) {
    case "GET":
      // 폴더 id 의 모든 링크 조회
      try {
        const response = await axiosInstance.get(`/folders/${folderId}/links`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "모든 폴더 조회에 실패했습니다." });
      }
  }
};
export default handler;
