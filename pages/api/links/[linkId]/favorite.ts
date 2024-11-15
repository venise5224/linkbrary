import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";
import { isAxiosError } from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "사용자 정보를 찾을 수 없습니다." });
  }

  const { linkId } = req.query;

  // 링크 즐겨 찾기
  switch (req.method) {
    case "PUT":
      const { favorite } = req.body;
      if (favorite === undefined) {
        return res.status(400).json({ message: "즐겨찾기 상태가 필요합니다." });
      }

      try {
        await axiosInstance.put(
          `/links/${linkId}/favorite`,
          { favorite },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res.status(200).json({
          message: `링크 즐겨찾기 ${favorite ? "추가" : "삭제"} 성공`,
        });
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const status = error.response.status;
          const message =
            error.response.data?.message || "알 수 없는 오류 발생";
          return res.status(status).json({ message });
        }
        return res.status(500).json({ message: "서버 오류" });
      }

    default:
      return res.status(405).json({ message: "허용되지 않은 접근 방법" });
  }
};

export default handler;
