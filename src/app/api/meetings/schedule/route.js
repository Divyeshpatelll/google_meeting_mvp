import { withErrorHandler } from '../../middleware/withErrorHandler';
import { successResponse, errorResponse } from '../../utils/response';
import { getGoogleCalendarClient, createMeeting } from '../../lib/google-calendar';

export const POST = withErrorHandler(async (req) => {
  const { startTime, endTime, summary } = await req.json();

  if (!startTime || !endTime) {
    return errorResponse('Start time and end time are required');
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const now = new Date();

  if (startDate < now) {
    return errorResponse('Start time cannot be in the past');
  }

  if (endDate <= startDate) {
    return errorResponse('End time must be after start time');
  }

  const calendar = await getGoogleCalendarClient();
  const meeting = await createMeeting(calendar, {
    startTime,
    endTime,
    summary: summary || "Scheduled Meeting"
  });
  
  return successResponse({
    meetLink: meeting.meetLink,
    startTime: meeting.startTime,
    endTime: meeting.endTime,
    eventId: meeting.eventId
  });
});
