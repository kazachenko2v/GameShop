export const dateToString = (dateArr: Date[]): string[] => {
  // if (dateArr) {
  const stringArr = dateArr.map((item: Date) => {
    const offset = item.getTimezoneOffset();
    return new Date(item.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
  });
  return stringArr;
  // }
};
