import { serialize } from "cookie";

import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      //string으로 들어와서 에러 날수도 있음

      const response = await axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });

      const token = response.data.accessToken;

      if (token) {
        // 토큰을 쿠키에 저장 (httpOnly, secure 설정)
        res.setHeader(
          "Set-Cookie",
          serialize("accessToken", token, {
            httpOnly: true, // 클라이언트에서 접근 불가
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1일 동안 쿠키 유지
            path: "/", // 루트 경로에 쿠키 적용
            // secure
          })
        );

        return res.status(200).json({ message: "로그인 성공" });
      } else {
        return res.status(401).json({ message: "권한 없음" });
      }
    } catch (error) {
      return res.status(500).json({ message: "서버 오류" });
    }
  } else {
    res.status(405).json({ message: "허용되지 않은 접근 방법" });
  }
};

export default handler;
