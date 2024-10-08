export const getMonthString = (date: Date): string => {
  return (date.getMonth() + 1).toString().padStart(2, "0");
};

export const convertToBE = (date: Date): string => {
  const buddhistYear = date.getFullYear() + 543;
  return buddhistYear.toString();
};

export const convertToAD = (buddhistYear: number): number => {
  return buddhistYear - 543;
};
