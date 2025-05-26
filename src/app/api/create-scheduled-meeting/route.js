import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createMeetEvent } from "../../lib/google";

export async function POST(req) {
  const session = await getServerSession({ req, ...authOptions });
  if (!session || !session.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log(session.accessToken);

  try {
    const { startTime, endTime } = await req.json();

    if (!startTime) {
      return Response.json(
        { error: "StartTime are required for scheduled meetings" },
        { status: 400 }
      );
    }
    if (!endTime) {
      return Response.json(
        { error: "EndTime are required for scheduled meetings" },
        { status: 400 }
      );
    }
    const meetLink = await createMeetEvent(session.accessToken, {
      startTime,
      endTime,
    });

    return Response.json({ meetLink }, { status: 200 });
  } catch (error) {
    console.log("Google Meet creation failed:", error);
    return Response.json({ error: "Failed to create Meet" }, { status: 500 });
  }
}
