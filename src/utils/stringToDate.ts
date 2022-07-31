export const dateToString = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0];
};

export const arrDateToString = (dateArr: Date[]): string[] => {
  return dateArr.map((item: Date) => dateToString(item));
};
