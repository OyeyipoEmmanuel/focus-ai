import dayjs from "dayjs";
export const useGetPeriodOfDay = (): string => {

  const hour = dayjs().hour();

  let period: string = "";

  if (hour < 12) {
    period = "Morning";
  } else if (hour >= 12 && hour <= 18) {
    period = "Afternoon";
  } else {
    period = "Evening";
  }

  return period;
};
