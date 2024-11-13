import axios from "axios";
import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { jwtDecode } from "jwt-decode";

interface GoogleUserInfo {
  name: string;
}

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

    // 토큰 요청
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const params = {
      code: code as string,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    };

    const tokenResponse = await axios.post(tokenUrl, params);
    const { id_token } = tokenResponse.data;
    if (!id_token) {
      return res
        .status(401)
        .json({ message: "ID 토큰을 가져오지 못했습니다." });
    }

    // Google ID 토큰에서 사용자 정보 추출
    const userInfo: GoogleUserInfo = jwtDecode(id_token);
    const { name } = userInfo;
    console.log(name);

    // 이미 회원인지 체크
    try {
      const loginResponse = await axiosInstance.post("/auth/sign-in/google", {
        token: id_token,
        redirectUri,
      });

      const accessToken = loginResponse.data.access_token;
      if (accessToken) {
        res.setHeader(
          "Set-Cookie",
          serialize("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
          })
        );
        return res.redirect("http://localhost:3000");
      }
    } catch (loginError: any) {
      console.error(
        "로그인 실패:",
        loginError.response?.data || loginError.message
      );

      // 로그인 실패 시 회원가입 시도
      try {
        const signUpResponse = await axiosInstance.post(
          "/auth/sign-up/google",
          {
            name: name || "사용자",
            token: id_token,
            redirectUri: "http://localhost:3000",
          }
        );

        const accessToken = signUpResponse.data.access_token;
        if (accessToken) {
          res.setHeader(
            "Set-Cookie",
            serialize("accessToken", accessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 60 * 60 * 24,
              path: "/",
            })
          );
          return res.redirect("http://localhost:3000");
        }
      } catch (signUpError: any) {
        console.error(
          "회원가입 실패:",
          signUpError.response?.data || signUpError.message
        );
        return res.status(500).json({
          message: "회원가입 중 오류가 발생했습니다.",
          error: signUpError.response?.data || signUpError.message,
        });
      }
    }
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    return res.status(500).json({
      message: "서버 오류",
      error: error.response?.data || error.message,
    });
  }
};

export default handler;
