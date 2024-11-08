import { serialize } from "cookie"; // 쿠키 직렬화를 위한 라이브러리

import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // 클라이언트에서 전달한 로그인 정보 받기
      const { email, password } = req.body;

      // 백엔드 API에 로그인 요청
      const response = await axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });

      // 백엔드에서 받은 토큰
      const token = response.data.accessToken;

      if (token) {
        // 토큰을 쿠키에 저장 (httpOnly, secure 설정)
        res.setHeader(
          "Set-Cookie",
          serialize("auth-token", token, {
            httpOnly: true, // 클라이언트에서 접근 불가
            secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서는 secure 설정
            maxAge: 60 * 60 * 24, // 1일 동안 쿠키 유지
            path: "/", // 루트 경로에 쿠키 적용
          })
        );

        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    } catch (error) {
      console.error("Login error:", error.response);

      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
