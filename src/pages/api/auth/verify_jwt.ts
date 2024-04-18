import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { API_KEY, BASE_URI } from "@/env";
import { serialize } from "cookie";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { jwt } = req.cookies;
  const { wallet } = req.body;

  try {
    const { data: response } = await axios.post(
      BASE_URI + "auth/verify_jwt_with_wallet",
      {
        jwt,
        wallet,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.error) {
      return res.status(200).json({
        error: false,
      });
    } else {
      return res.status(400).json({ error: true });
    }
  } catch (err: any) {
    res.status(400).json({ error: true });
  }
};

export default handler;
