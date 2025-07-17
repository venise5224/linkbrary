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

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_SIGN_IN || "/";

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

    const userInfo: GoogleUserInfo = jwtDecode(id_token);
    const { name } = userInfo;

    // 간편 로그인 시도, 실패 시 간편 회원가입 시도
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

        return res.redirect(`/?message=${encodeURIComponent("로그인 성공")}`);
      }
    } catch (loginError: any) {
      // 간편 로그인 실패 후, 간편 회원가입 시도
      try {
        const signUpResponse = await axiosInstance.post(
          "/auth/sign-up/google",
          {
            name: name || "사용자",
            token: id_token,
            redirectUri,
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
          return res.status(200).json({
            message: "회원가입 성공",
            redirectUrl: "/?message=" + encodeURIComponent("회원가입 성공"),
          });
        }
      } catch (signUpError: any) {
        return res.redirect(
          "/signin?message=" + encodeURIComponent("간편 로그인 실패")
        );
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
