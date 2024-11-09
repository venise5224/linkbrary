import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

export const proxy = axios.create({
  // 배포 이후에는 배포된 URL로 변경해야 함.
  // baseURL: "http://localhost:3000", -> baseURL을 안쓰면 로컬에서는 로컬3000, 배포했을때는 배포된 도메인으로 감
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
