import axios from "axios";
import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ message: "인증 코드가 없습니다." });
    }

    // 환경 변수 검증
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI_SIGN_IN || "http://localhost:3000/";

    if (!clientId || !clientSecret) {
      return res
        .status(500)
        .json({ message: "Google API 클라이언트 정보가 설정되지 않았습니다." });
    }

    // 토큰 요청 URL 및 파라미터 설정
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const params = {
      code: code as string,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    };

    // Google API 토큰 요청
    const tokenResponse = await axios.post(tokenUrl, params);
    console.log("Google Token Response:", tokenResponse.data);

    const { id_token } = tokenResponse.data;
    if (!id_token) {
      return res
        .status(401)
        .json({ message: "ID 토큰을 가져오지 못했습니다." });
    }

    // 사용자 인증 요청
    const authResponse = await axiosInstance.post("/auth/sign-in/google", {
      token: id_token,
      redirectUri,
    });

    const access_token = authResponse.data.access_token;

    if (!access_token) {
      return res
        .status(401)
        .json({ message: "액세스 토큰을 가져오지 못했습니다." });
    }

    // 쿠키 설정 (httpOnly, secure)
    res.setHeader(
      "Set-Cookie",
      serialize("accessToken", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 secure 적용
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1일 동안 유지
        path: "/",
      })
    );

    // 성공적인 응답
    return res.redirect("http://localhost:3000");
  } catch (error: any) {
    // 에러 로그 및 예외 처리
    console.error("Error:", error.response?.data || error.message);
    return res.status(500).json({
      message: "서버 오류 발생",
      error: error.response?.data || error.message,
    });
  }
};

export default handler;
