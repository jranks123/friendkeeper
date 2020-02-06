export function calculateDaysAgo(startDateNum: number): number {

  const startDate = new Date(startDateNum);

  // The number of milliseconds in all UTC days (no DST)
  const oneDay = 1000 * 60 * 60 * 24;
  const endDate = new Date();
  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  const end = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
  );

  // so it's safe to divide by 24 hours
  return (start - end) / oneDay;
}

export function calculateDaysOverdue(
  dateOfLastRendezvous: number,
  maximumDaysBetweenRendezvous: number,
  name: string
): number {
  if (dateOfLastRendezvous === null) {
    return null;
  }
  return calculateDaysAgo(dateOfLastRendezvous) - maximumDaysBetweenRendezvous;
}
