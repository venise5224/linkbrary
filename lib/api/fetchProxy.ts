import { proxy } from "./axiosInstanceApi";

// SSR에서 proxy로 요청 보낼 때 사용하는 로직 추상화
const fetchProxy = async (endpoint: string, req: any) => {
  const headers = req ? { Cookie: req.headers.cookie } : undefined;
  const response = await proxy.get(endpoint, { headers });
  return response.data;
};

export default fetchProxy;
