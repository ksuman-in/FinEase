import dayjs from "dayjs";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatTime = ({
  time,
  format = "MMM, YYYY",
}: {
  time?: Date | undefined;
  format?: string | undefined;
}) => {
  if (time) {
    return dayjs(time).format(format);
  } else {
    return dayjs().format(format);
  }
};
export const addYearMonthDay = ({
  day = 0,
  month = 0,
  year = 0,
  format = "MMM, YYYY",
}: {
  day?: number;
  month?: number;
  year?: number;
  format?: string;
}) => {
  let date = dayjs();
  if (day) {
    date = date.add(day, "day");
  }
  if (month) {
    date = date.add(month, "month");
  }
  if (year) {
    date = date.add(year, "year");
  }
  return date.format(format);
};
