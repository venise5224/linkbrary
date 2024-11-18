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
  fetchUserInfo: () => Promise<boolean>;
  login: (body: signInProps) => Promise<boolean>;
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

      // 사용자 정보 가져오기 함수
      fetchUserInfo: async () => {
        try {
          const userInfo = await getUserInfo();
          if (userInfo) {
            set({ user: userInfo });
            return true;
          } else {
            set({ user: null });
            return false;
          }
        } catch (error) {
          console.error("사용자 정보 가져오기 에러", error);
        }
        return false;
      },

      // 로그인 함수
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

      // 로그아웃 함수
      logout: async () => {
        try {
          set({ user: null });
          await proxy.post("/api/auth/sign-out");
          localStorage.removeItem("auth-storage");
        } catch (error) {
          console.error("로그아웃 중 에러가 발생했습니다.", error);
        }
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
