import { proxy } from "@/lib/api/axiosInstanceApi";
import axios from "axios";
import { useEffect } from "react";

const Google = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const idToken = params.get("id_token"); // Google에서 전달받은 id_token
    const accessToken = params.get("access_token"); // Google에서 전달받은 id_token

    if (accessToken) {
      console.log(" Access Token:", accessToken);
      proxy
        .post("/api/auth/sign-up/google", {
          name: "박문균",
          token: accessToken,
          redirectUri: "http://localhost:3000/google",
        })
        .then((response) => {
          console.log("Authentication Success:", response.data);
          // 성공적인 로그인 처리 후, 리다이렉션 등의 작업을 할 수 있습니다.
        })
        .catch((error) => {
          console.error("Authentication Error:", error);
        });
    } else {
      console.error("Access Token이 없습니다.");
    }

    if (idToken) {
      console.log("Id Token:", idToken);

      // 서버로 id_token을 전달하여 인증을 요청합니다.
      proxy
        .post("/api/auth/sign-in/google", {
          token: idToken,
          redirectUri: "http://localhost:3000/google",
        })
        .then((response) => {
          console.log("Authentication Success:", response.data);
          // 성공적인 로그인 처리 후, 리다이렉션 등의 작업을 할 수 있습니다.
        })
        .catch((error) => {
          console.error("Authentication Error:", error);
        });
    } else {
      console.error("Id Token이 없습니다.");
    }
  }, []);

  return <div>Google OAuth 로그인 완료</div>;
};

export default Google;
