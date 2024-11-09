import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axiosInstance from "@/lib/api/axiosInstanceApi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "GET":
      // 현재 유저 조회
      try {
        const response = await axiosInstance.get(`/users`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "프로필 조회에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
