import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { token, redirectUri } = req.body;

      await axiosInstance.post("/auth/sign-in/google", {
        token,
        redirectUri,
      });
      return res.status(200).json({ message: "회원가입 성공" });
    } catch (error) {
      return res.status(400).json({ message: "서버 오류" });
    }
  } else {
    res.status(405).json({ message: "허용되지 않은 접근 방법" });
  }
};

export default handler;
