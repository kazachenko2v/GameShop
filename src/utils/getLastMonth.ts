import { arrDateToString } from "./stringToDate";

export default function (count: number) {
  const d = new Date();
  d.setMonth(d.getMonth() - count);

  return `&dates=${arrDateToString([d, new Date()])}`;
}
