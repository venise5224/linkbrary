import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/AuthTypes";
import {
  postSignIn,
  signInProps,
  easySignInProps,
  postEasySignIn,
} from "@/lib/api/auth";
import { getUserInfo } from "@/lib/api/user";
import { proxy } from "@/lib/api/axiosInstanceApi";

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  checkLogin: () => Promise<void>;
  login: (body: signInProps) => Promise<boolean>;
  SNSLogin: (
    provider: "google" | "kakao",
    body: easySignInProps
  ) => Promise<boolean>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      checkLogin: async () => {
        try {
          const response = await proxy.get("/api/auth/sign-check");
          if (response.data.isLoggedIn) {
            const userInfo = await getUserInfo();
            if (userInfo) {
              set({ isLoggedIn: true, user: userInfo });
            }
          } else {
            set({ isLoggedIn: false, user: null });
          }
        } catch (error) {
          console.error("로그인 상태 확인 중 오류 발생", error);
          set({ isLoggedIn: false, user: null });
        }
      },

      login: async (body) => {
        try {
          const { email, password } = body;
          const response = await postSignIn({ email, password });
          if (response) {
            const userInfo = await getUserInfo();
            if (userInfo) {
              set({ isLoggedIn: true, user: userInfo });
              return true;
            }
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
            const userInfo = await getUserInfo();
            if (userInfo) {
              set({ isLoggedIn: true, user: userInfo });
              return true;
            }
          }
        } catch (error) {
          console.error("소셜 로그인 중 에러가 발생했습니다.", error);
        }
        return false;
      },

      logout: async () => {
        try {
          await proxy.post("/api/auth/sign-out");
          set({ user: null, isLoggedIn: false });
        } catch (error) {
          console.error("로그아웃 중 에러가 발생했습니다.", error);
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
