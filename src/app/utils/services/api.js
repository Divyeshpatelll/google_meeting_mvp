import api from "../axios";

const handleError = (error) => {
  let message = "Something went wrong.";

  if (error?.response) {
    const { status, data } = error.response;

    if (data?.message) {
      message = data.message;
    } else {
      switch (status) {
        case 400:
          message = "Bad request";
          break;
        case 401:
          message = "Unauthorized Please log in again";
          break;
        case 403:
          message = "Access denied.";
          break;
        case 404:
          message = "Not found";
          break;
        case 500:
          message = "Internal Server error";
          break;
        default:
          message = `Unexpected error: ${status}`;
      }
    }
  } else if (error?.message) {
    message = error.message;
  }

  return message;
};

const generateMeetLink = async () => {
  const response = await api.post("create-meeting");
  return response.data;
};

const generateScheduledMeetLink = async (payload) => {
  const response = await api.post("create-scheduled-meeting", payload);
  return response.data;
};

export const API_SERVICES = {
  handleError,
  generateMeetLink,
  generateScheduledMeetLink,
};
