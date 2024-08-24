import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

// POST handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { username } = req.body;

      // Example: retrieve or update the list of players (this is just a placeholder)
      const players = {}; // Replace with actual logic to manage players

      // Broadcast that a player has joined
      await pusher.trigger("typing-test", "playerJoined", {
        username,
        players,
      });

      return res.status(200).json({ message: "Player joined", username });
    } catch (error) {
      console.error("Error broadcasting event:", error);
      return res.status(500).json({
        message: "Error broadcasting event",
        error: (error as Error).message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
