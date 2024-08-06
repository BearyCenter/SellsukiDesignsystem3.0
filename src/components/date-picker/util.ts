export const getMonthString = (date: Date): string => {
  return (date.getMonth() + 1).toString().padStart(2, "0");
};
