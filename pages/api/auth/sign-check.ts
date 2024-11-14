import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.accessToken;

  if (token) {
    return res.status(200).json({ isLoggedIn: true });
  }

  return res.status(200).json({ isLoggedIn: false });
};

export default handler;
