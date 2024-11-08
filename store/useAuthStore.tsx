import { create } from "zustand";
import {
  postSignIn,
  signInProps,
  easySignInProps,
  postEasySignIn,
} from "@/lib/api/auth";
import { User } from "@/types/AuthTypes";
import { getUserInfo } from "@/lib/api/user";

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (body: signInProps) => Promise<void>;
  SNSLogin: (
    provider: "google" | "kakao",
    body: easySignInProps
  ) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,

  login: async (body) => {
    try {
      const response = await postSignIn(body);
      if (response) {
        const userInfo = await getUserInfo();
        if (userInfo) {
          set({ isLoggedIn: true, user: userInfo });
        }
      }
    } catch (error) {
      console.error("로그인 중 에러가 발생했습니다", error);
    }
  },

  SNSLogin: async (provider, body) => {
    try {
      const response = await postEasySignIn(provider, body);
      if (response) {
        const userInfo = await getUserInfo();
        if (userInfo) {
          set({ isLoggedIn: true, user: userInfo });
        }
      }
    } catch (error) {
      console.log("소셜 로그인 중 에러가 발생했습니다.", error);
    }
  },

  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
