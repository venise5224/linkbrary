import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";
import { isAxiosError } from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "사용자 정보를 찾을 수 없습니다." });
  }

  const { linkId } = req.query;

  switch (req.method) {
    // 링크 삭제
    case "DELETE":
      if (!linkId) {
        return res
          .status(400)
          .json({ message: "삭제할 링크 ID가 필요합니다." });
      }

      try {
        await axiosInstance.delete(`/links/${linkId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.status(200).json({ message: "링크 삭제 성공" });
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const status = error.response.status;
          const message =
            error.response.data?.message || "알 수 없는 오류 발생";
          return res.status(status).json({ message });
        }
        return res.status(500).json({ message: "서버 오류" });
      }

    // 링크 수정
    case "PUT":
      if (!linkId) {
        return res
          .status(400)
          .json({ message: "업데이트할 링크 ID가 필요합니다." });
      }

      const updateData = req.body;
      if (!updateData) {
        return res
          .status(400)
          .json({ message: "업데이트할 데이터가 필요합니다." });
      }

      try {
        const updatedLink = await axiosInstance.put(
          `/links/${linkId}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res.status(200).json(updatedLink.data);
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
