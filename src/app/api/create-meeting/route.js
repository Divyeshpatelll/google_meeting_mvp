import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createMeetEvent } from "../../lib/google";

export async function POST(req) {
  const session = await getServerSession({ req, ...authOptions });
  console.log(session);

  if (!session || !session.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const meetLink = await createMeetEvent(session.accessToken);
    return Response.json({ meetLink });
  } catch (error) {
    console.error("Google Meet creation failed:", error);
    return Response.json({ error: "Failed to create Meet" }, { status: 500 });
  }
}
