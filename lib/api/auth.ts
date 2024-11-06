import axiosInstance from "./axiosInstanceApi";

interface signInProps {
  email: string;
  password: string;
}

interface signUpProps extends signInProps {
  name: string;
}

interface easySignInProps {
  token: string;
  redirectUri: string;
}

interface easySignUpProps extends easySignInProps {
  name: string;
}

export const postSignUp = async (body: signUpProps) => {
  try {
    const res = await axiosInstance.post("/auth/sign-up", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

export const postSignIn = async (body: signInProps) => {
  try {
    const res = await axiosInstance.post("/auth/sign-in", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

export const postEasySignUp = async (
  provider: "google" | "kakao",
  body: easySignUpProps
) => {
  try {
    const res = await axiosInstance.post(`/auth/sign-up/${provider}`, body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

export const postEasySignIn = async (
  provider: "google" | "kakao",
  body: easySignInProps
) => {
  try {
    const res = await axiosInstance.post(`/auth/sign-in/${provider}`, body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};
