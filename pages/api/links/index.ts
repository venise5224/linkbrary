import axiosInstance from "@/lib/api/axiosInstanceApi";
import axios, { isAxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.accessToken;
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ error: "사용자 정보를 찾을 수 없습니다." });
  }

  if (req.method === "POST") {
    try {
      await axiosInstance.post("/links", req.body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.status(201).json({ message: "링크 추가 성공" }); // 테스트 필요
    } catch (error) {
      if (isAxiosError(error) && error.response) {
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
