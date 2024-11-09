import axiosInstance from "@/lib/api/axiosInstanceApi";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.accessToken;
  console.log("Token:", token); // 쿠키 확인

  if (!token) {
    return res.status(401).json({ error: "사용자 정보를 찾을 수 없습니다." });
  }

  if (req.method === "POST") {
    try {
      const response = await axiosInstance.post("/folders", req.body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return res.status(200).json({ message: "폴더 생성 성공" });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "알 수 없는 오류 발생";
        return res.status(status).json({ message });
      }
    }
  } else {
    res.status(405).json({ message: "허용되지 않은 접근 방법" });
  }
};

export default handler;
