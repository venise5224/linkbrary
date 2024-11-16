import axiosInstance from "./axiosInstanceApi";

interface postOAuthProps {
  provider: string;
  appKey: string;
}

// 간편 로그인 App 등록/수정
export const postOAuth = async (body: postOAuthProps) => {
  try {
    const res = await axiosInstance.post("/oauthApps", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};
