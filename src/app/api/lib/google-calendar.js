import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export const getGoogleCalendarClient = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    throw new Error('No access token found');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: session.accessToken
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
};

export const createMeeting = async (calendar, { startTime, endTime, summary = "New Meeting" } = {}) => {
  try {
    const event = {
      summary,
      start: {
        dateTime: startTime || new Date().toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endTime || new Date(Date.now() + 3600000).toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      conferenceData: {
        createRequest: {
          requestId: Date.now().toString(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      resource: event,
    });

    return {
      meetLink: response.data.hangoutLink,
      eventId: response.data.id,
      startTime: response.data.start.dateTime,
      endTime: response.data.end.dateTime
    };
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw error;
  }
}; 