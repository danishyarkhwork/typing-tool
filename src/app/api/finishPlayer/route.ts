import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { username, wpm, accuracy } = req.body;

      await pusher.trigger("typing-test", "playerFinished", {
        username,
        wpm,
        accuracy,
      });

      return res.status(200).json({ message: "Player finished", username });
    } catch (error) {
      console.error("Error:", error);

      return res
        .status(500)
        .json({
          message: "Error finishing game",
          error: (error as Error).message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
