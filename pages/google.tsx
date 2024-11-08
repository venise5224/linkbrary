import axios from "axios";
import { useEffect } from "react";

const Google = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("access_token");
    console.log(token);

    axios
      .get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => console.log(res));
  }, []);

  return <div>안녕</div>;
};

export default Google;
