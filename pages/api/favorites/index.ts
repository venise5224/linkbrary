import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axiosInstance from "@/lib/api/axiosInstanceApi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  console.log("Received cookies:", cookies); // 쿠키 전체 확인
  console.log("Access Token:", accessToken); // accessToken 확인

  switch (req.method) {
    case "GET":
      // 즐겨찾기 목록 조회
      try {
        const response = await axiosInstance.get(
          "/favorites?page=1&pageSize=10",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(200).json(response.data);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "즐겨찾기 목록 조회에 실패했습니다." });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};
export default handler;
