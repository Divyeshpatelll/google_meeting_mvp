export const API_CONFIG = {
  BASE_URL: '/api',
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const TIME_INTERVALS = {
  MIN_MEETING_DURATION: 60000,
};

export const ERROR_MESSAGES = {
  PAST_DATETIME: 'Cannot select past date & time',
  INVALID_END_TIME: 'End time must be after start date & time',
  MISSING_DATETIME: 'Please select both start and end date & time',
};

export const DATE_FORMAT_OPTIONS = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
}; 