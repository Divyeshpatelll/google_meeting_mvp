"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { API_SERVICES } from "./utils/services/api";
import { ERROR_MESSAGES } from "./utils/constants";
import {
  formatDateTime,
  getCurrentDateTime,
  getMinEndTime,
  isValidTimeRange
} from "./utils/dateUtils";

// Import Components
import SignInButton from "./components/auth/SignInButton";
import SignOutButton from "./components/auth/SignOutButton";
import LoadingSpinner from "./components/LoadingSpinner";
import DateTimeInput from "./components/DateTimeInput";
import MeetingLink from "./components/MeetingLink";

export default function Home() {
  const { data: session } = useSession();
  const [scheduledStartTime, setScheduledStartTime] = useState("");
  const [scheduledEndTime, setScheduledEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleStartTimeChange = (e) => {
    const selectedDateTime = new Date(e.target.value);
    const currentDateTime = new Date();

    if (selectedDateTime < currentDateTime) {
      setValidationError(ERROR_MESSAGES.PAST_DATETIME);
      return;
    }

    setScheduledStartTime(e.target.value);
    if (scheduledEndTime) {
      const endDateTime = new Date(scheduledEndTime);
      if (endDateTime <= selectedDateTime) {
        setScheduledEndTime("");
      }
    }
    setValidationError("");
  };

  const handleEndTimeChange = (e) => {
    const selectedEndDateTime = new Date(e.target.value);
    const startDateTime = new Date(scheduledStartTime);

    if (selectedEndDateTime <= startDateTime) {
      setValidationError(ERROR_MESSAGES.INVALID_END_TIME);
      setScheduledEndTime("");
      return;
    }

    setScheduledEndTime(e.target.value);
    setValidationError("");
  };

  const generateLink = async () => {
    setIsLoading(true);
    try {
      const data = await API_SERVICES.generateMeetLink();
      setMeetingLink(data?.meetLink);
    } catch (err) {
      console.error("Error generating link:", API_SERVICES.handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduledMeeting = async () => {
    if (!isValidTimeRange(scheduledStartTime, scheduledEndTime)) {
      setValidationError(ERROR_MESSAGES.MISSING_DATETIME);
      return;
    }

    setIsScheduleLoading(true);
    try {
      const startTimeIST = scheduledStartTime + ":00+05:30";
      const endTimeIST = scheduledEndTime + ":00+05:30";

      const data = await API_SERVICES.generateScheduledMeetLink({
        startTime: startTimeIST,
        endTime: endTimeIST,
      });

      const formattedStartTime = formatDateTime(scheduledStartTime);
      const formattedEndTime = formatDateTime(scheduledEndTime);

      setMeetingLink(
        `${data?.meetLink} (Scheduled from ${formattedStartTime} to ${formattedEndTime})`
      );
    } catch (err) {
      console.error("Error scheduling meeting:", API_SERVICES.handleError(err));
    } finally {
      setIsScheduleLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl text-black font-bold mb-4">
            Meeting Scheduler
          </h1>
          <SignInButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Hi, {session.user.name} 👋</h2>
          <SignOutButton />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">🔹 Instant Meeting</h3>
          <button
            onClick={generateLink}
            disabled={isLoading}
            className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Creating Meeting...
              </>
            ) : (
              "Generate Meet Link"
            )}
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">📅 Schedule Meeting</h3>
          <div className="space-y-4">
            <DateTimeInput
              label="Start Date & Time"
              value={scheduledStartTime}
              onChange={handleStartTimeChange}
              min={getCurrentDateTime()}
              disabled={isScheduleLoading}
            />
            <DateTimeInput
              label="End Date & Time"
              value={scheduledEndTime}
              onChange={handleEndTimeChange}
              min={getMinEndTime(scheduledStartTime)}
              disabled={isScheduleLoading || !scheduledStartTime}
            />
            {validationError && (
              <div className="text-red-500 text-sm py-2">
                ⚠️ {validationError}
              </div>
            )}
            <button
              onClick={handleScheduledMeeting}
              disabled={isScheduleLoading}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center ${
                isScheduleLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isScheduleLoading ? (
                <>
                  <LoadingSpinner />
                  Scheduling Meeting...
                </>
              ) : (
                "Schedule Meeting"
              )}
            </button>
          </div>
        </div>

        {meetingLink && <MeetingLink link={meetingLink} />}
      </div>
    </div>
  );
}
