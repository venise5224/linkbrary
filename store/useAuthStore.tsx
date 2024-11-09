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

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (body: signInProps) => Promise<boolean>;
  SNSLogin: (
    provider: "google" | "kakao",
    body: easySignInProps
  ) => Promise<boolean>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

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

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
