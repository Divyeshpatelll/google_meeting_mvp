import { DATE_FORMAT_OPTIONS } from './constants';

export const formatDateTimeForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getCurrentDateTime = () => {
  return formatDateTimeForInput(new Date());
};

export const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  return date
    .toLocaleString("en-GB", DATE_FORMAT_OPTIONS)
    .replace(",", "");
};

export const getMinEndTime = (startTime) => {
  if (!startTime) return getCurrentDateTime();
  return new Date(new Date(startTime).getTime() + 60000)
    .toISOString()
    .slice(0, 16);
};

export const isValidTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return false;
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const currentDate = new Date();
  
  if (startDate < currentDate) return false;
  if (endDate <= startDate) return false;
  
  return true;
}; 