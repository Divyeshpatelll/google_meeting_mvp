"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { API_SERVICES } from "./utils/services/api";

export default function Home() {
  const { data: session } = useSession();
  const [scheduledStartTime, setScheduledStartTime] = useState("");
  const [scheduledEndTime, setScheduledEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');
  };

  const generateLink = async () => {
    setIsLoading(true);
    try {
      const data = await API_SERVICES.generateMeetLink();
      setMeetingLink(data?.meetLink);
    } catch (err) {
      console.log("err", API_SERVICES.handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const validateScheduledTime = () => {
    setValidationError("");

    if (!scheduledStartTime || !scheduledEndTime) {
      setValidationError("Please select both start and end time");
      return false;
    }

    const startDate = new Date(scheduledStartTime);
    const endDate = new Date(scheduledEndTime);
    const currentDate = new Date();

    if (startDate < currentDate) {
      setValidationError("Start time cannot be in the past");
      return false;
    }

    if (endDate <= startDate) {
      setValidationError("End time must be after start time");
      return false;
    }

    return true;
  };

  const handleScheduledMeeting = async () => {
    if (!validateScheduledTime()) {
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
      console.log("err", API_SERVICES.handleError(err));
    } finally {
      setIsScheduleLoading(false);
    }
  };

  const handleStartTimeChange = (e) => {
    setScheduledStartTime(e.target.value);
    setValidationError("");
  };

  const handleEndTimeChange = (e) => {
    setScheduledEndTime(e.target.value);
    setValidationError("");
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl text-black font-bold mb-4">
            Meeting Scheduler
          </h1>
          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Hi, {session.user.name} 👋</h2>
          <button
            onClick={() => signOut()}
            className="text-sm bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
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
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
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
            <div>
              <p className="mb-1">Start Time: </p>
              <input
                type="datetime-local"
                value={scheduledStartTime}
                onChange={handleStartTimeChange}
                className="border px-3 py-2 rounded w-full"
                disabled={isScheduleLoading}
              />
            </div>
            <div>
              <p className="mb-1">End Time: </p>
              <input
                type="datetime-local"
                value={scheduledEndTime}
                onChange={handleEndTimeChange}
                className="border px-3 py-2 rounded w-full"
                disabled={isScheduleLoading}
              />
            </div>
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
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Scheduling Meeting...
                </>
              ) : (
                "Schedule Meeting"
              )}
            </button>
          </div>
        </div>

        {meetingLink && (
          <div className="mt-4 bg-gray-100 p-4 rounded border text-center">
            <p className="font-medium mb-2">Your Meeting Link:</p>
            <a
              href={meetingLink?.split(" ")?.at(0)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {meetingLink?.split(" ")?.at(0)}
            </a>
              <br />
              {meetingLink?.split("(")?.at(1)?.trim() || ""}
          </div>
        )}
      </div>
    </div>
  );
}
