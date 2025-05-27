import { withErrorHandler } from '../../middleware/withErrorHandler';
import { successResponse } from '../../utils/response';
import { getGoogleCalendarClient, createMeeting } from '../../lib/google-calendar';

export const POST = withErrorHandler(async () => {
  const calendar = await getGoogleCalendarClient();
  const meeting = await createMeeting(calendar);
  
  return successResponse({
    meetLink: meeting.meetLink,
    startTime: meeting.startTime,
    endTime: meeting.endTime
  });
});
