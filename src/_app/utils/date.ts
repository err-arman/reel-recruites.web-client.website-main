import dayjs from "dayjs";

export const timeDiff = (date1: Date, date2: Date) => {
  const days = dayjs(date1).diff(dayjs(date2), "days");

  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  if (years === 0) {
    return `${months} months`;
  }
  return `${years} years ${months} months`;
};
