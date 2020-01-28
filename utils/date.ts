export function calculateDaysAgo(startDate: Date): number {
    if (startDate === null) {
        return null
    }

    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;
    const endDate = new Date;
    console.log(startDate)
    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    // so it's safe to divide by 24 hours
    return (start - end) / oneDay;
}

export function calculateDaysOverdue(
    dateOfLastRendezvous: Date,
    minimumDaysBetweenRendezvous: number
): number {
    if (dateOfLastRendezvous === null) {
        return null
    }
    return calculateDaysAgo(dateOfLastRendezvous) - minimumDaysBetweenRendezvous;
}