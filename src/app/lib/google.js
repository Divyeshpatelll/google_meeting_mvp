import { google } from "googleapis";

export const createMeetEvent = async (accessToken, scheduledTime = null) => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth });

  const startTime = scheduledTime?.startTime ? new Date(scheduledTime.startTime) : new Date();
  const endTime = scheduledTime?.endTime ? new Date(scheduledTime.endTime) : new Date(Date.now() + 30 * 60 * 1000);
  
  const summary = scheduledTime ? "Scheduled Meeting" : "Instant Meeting";

  const res = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: summary,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return res.data.hangoutLink;
};
