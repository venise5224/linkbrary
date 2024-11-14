import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      res.setHeader(
        "Set-Cookie",
        serialize("accessToken", "", {
          httpOnly: true,
          sameSite: "lax",
          expires: new Date(0),
          path: "/",
        })
      );

      return res.status(200).json({ message: "로그아웃 성공" });
    } catch (error) {
      return res.status(500).json({ message: "서버 오류" });
    }
  } else {
    res.status(405).json({ message: "허용되지 않은 접근 방법" });
  }
};

export default handler;
