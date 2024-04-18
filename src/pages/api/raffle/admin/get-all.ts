import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BASE_URI_HM } from "@/env";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { jwt } = req.cookies;
  const { wallet } = req.body;

  try {
    const {
      data: { error, data },
    } = await axios.post(
      `${BASE_URI_HM}idle-games`,
      {
        game: "draco-raffle",
        action: "admin-get-all-raffles",
        data: {
          wallet,
          jwt,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    if (!error) {
      return res.status(200).json({
        data,
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
