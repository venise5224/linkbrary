import axios from "axios";
import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ message: "인증 코드가 없습니다." });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/";

    if (!clientId || !clientSecret) {
      return res
        .status(500)
        .json({ message: "Google API 클라이언트 정보가 설정되지 않았습니다." });
    }

    const tokenUrl = "https://oauth2.googleapis.com/token";
    const params = new URLSearchParams({
      code: code as string,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    // 토큰 요청
    const tokenResponse = await axios.post(tokenUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token } = tokenResponse.data;
    if (!access_token) {
      return res
        .status(401)
        .json({ message: "액세스 토큰을 가져오지 못했습니다." });
    }

    // 사용자 정보 요청
    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    const userInfo = userInfoResponse.data;

    // 서버로 사용자 정보 전송
    await axiosInstance.post("/auth/sign-up/google", {
      name: userInfo.name,
      token: access_token,
      redirectUri: "http://localhost:3000", // 실제 배포 환경에서는 환경 변수 사용
    });

    // 성공적인 응답
    return res.status(200).json({ message: "회원가입 성공", user: userInfo });
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    return res.status(500).json({
      message: "서버 오류",
      error: error.response?.data || error.message,
    });
  }
};

export default handler;
