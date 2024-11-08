import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.accessToken;
  console.log("Token:", token); // 쿠키 확인

  if (!token) {
    return res.status(401).json({ error: "사용자 정보를 찾을 수 없습니다." });
  }

  if (req.method === "POST") {
    try {
      const { name } = req.body;

      const response = await axiosInstance.post("/folders", { name });
      console.log(response);
      return res.status(200).json({ message: "폴더 생성 성공" });
    } catch (error) {
      return res.status(500).json({ message: "서버 오류" });
    }
  } else {
    res.status(405).json({ message: "허용되지 않은 접근 방법" });
  }
};

export default handler;
