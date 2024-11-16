import { create } from "zustand";
import { User } from "@/types/AuthTypes";
import {
  postSignIn,
  signInProps,
  easySignInProps,
  postEasySignIn,
} from "@/lib/api/auth";
import { getUserInfo } from "@/lib/api/user";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  login: (body: signInProps) => Promise<boolean>;
  SNSLogin: (
    provider: "google" | "kakao",
    body: easySignInProps
  ) => Promise<boolean>;
  logout: () => Promise<void>;
}

const fetchUserInfo = async (set: any) => {
  try {
    const userInfo = await getUserInfo();
    if (userInfo) {
      set({ user: userInfo });
      return true;
    }
  } catch (error) {
    console.error("사용자 정보 가져오기 에러", error);
  }
  return false;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      login: async (body) => {
        try {
          const response = await postSignIn(body);
          if (response) {
            return await fetchUserInfo(set);
          }
        } catch (error) {
          console.error("로그인 중 에러가 발생했습니다", error);
        }
        return false;
      },

      SNSLogin: async (provider, body) => {
        try {
          const response = await postEasySignIn(provider, body);
          if (response) {
            return await fetchUserInfo(set);
          }
        } catch (error) {
          console.error("소셜 로그인 중 에러가 발생했습니다.", error);
        }
        return false;
      },

      logout: async () => {
        try {
          await proxy.post("/api/auth/sign-out");
          set({ user: null });
          localStorage.removeItem("token"); // 토큰 삭제
        } catch (error) {
          console.error("로그아웃 중 에러가 발생했습니다.", error);
        }
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
