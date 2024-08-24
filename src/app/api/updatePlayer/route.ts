import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

// Initialize Pusher with environment variables
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

// Handle the POST request
export async function POST(req: NextRequest) {
  try {
    const { username, wpm, wordIndex, progress } = await req.json();

    await pusher.trigger("typing-test", "updatePlayers", {
      username,
      wpm,
      wordIndex,
      progress,
    });

    return NextResponse.json({ message: "Player updated", username });
  } catch (error) {
    console.error("Error:", error);

    return new NextResponse(
      JSON.stringify({
        message: "Error updating player",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
