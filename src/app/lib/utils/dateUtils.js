// Convert date to HTML datetime-local input format (YYYY-MM-DDTHH:mm)
export const formatDateForInput = (date) => {
  const d = new Date(date);
  return d.toISOString().slice(0, 16);
};

// Convert date to display format (MM/DD/YYYY hh:mm AM/PM)
export const formatDateForDisplay = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Get current date-time in input format
export const getCurrentDateTime = () => {
  return formatDateForInput(new Date());
};

// Get minimum end time (current time or start time + 1 minute)
export const getMinEndTime = (startTime) => {
  if (!startTime) return getCurrentDateTime();
  
  const minEndDate = new Date(startTime);
  minEndDate.setMinutes(minEndDate.getMinutes() + 1);
  return formatDateForInput(minEndDate);
};

// Validate time range
export const isValidTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return false;
  
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const currentDate = new Date();
  
  if (startDate < currentDate) return false;
  if (endDate <= startDate) return false;
  
  return true;
}; 