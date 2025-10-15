import dayjs from "dayjs";

export const toISO = (d: Date | string) => dayjs(d).toISOString();
export const parsePeriod = (period?: string) => {
  if (!period) return null;
  const num = parseInt(period, 10);
  if (period.endsWith("d")) return { from: dayjs().subtract(num, "day").toISOString(), to: dayjs().toISOString() };
  if (period.endsWith("y")) return { from: dayjs().subtract(num, "year").toISOString(), to: dayjs().toISOString() };
  return null;
};
