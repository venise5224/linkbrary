import axiosInstance, { proxy } from "./axiosInstanceApi";

interface postUserProps {
  email: string;
}

// 현재 유저 조회(auth)
export const getUserInfo = async () => {
  try {
    const res = await proxy.get("/api/users");
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 이메일 중복 확인
export const postCheckEmail = async (body: postUserProps) => {
  try {
    const res = await axiosInstance.post("/users/check-email", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};
