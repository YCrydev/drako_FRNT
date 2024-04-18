import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { API_KEY, BASE_URI } from "@/env";
import { serialize } from "cookie";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { wallet, signature } = req.body;

  try {
    const { data: response } = await axios.post(
      "https://rest-api.hellomoon.io/v0/auth/create_jwt",
      {
        wallet,
        signature,
        isTransaction: true,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Serialize a cookie
    const serialized = serialize("jwt", response.jwt, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1, // 1 hour
      sameSite: "strict",
      path: "/",
    });

    // Set the cookie in the response header
    res.setHeader("Set-Cookie", serialized);

    return res.status(200).json({
      error: false,
    });
  } catch (err: any) {
    return res.status(400).json({ error: true });
  }
};

export default handler;
