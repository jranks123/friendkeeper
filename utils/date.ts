export function getTodaysDateString() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; //January is 0!

    let yyyyString = today.getFullYear().toString();
    const ddString = dd < 10 ? '0' + dd.toString() : dd.toString();
    const mmString = mm < 10 ? '0' + mm.toString() : mm.toString();
    return yyyyString + '-' + mmString + "-" + ddString;
}

export function calculateDaysAgo(startDateString: string): number {
    if (startDateString === null) {
        return null
    }
    const startDate = new Date(Date.parse(startDateString));

    //The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;
    const endDate = new Date;
    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    // so it's safe to divide by 24 hours
    return (start - end) / oneDay;

}


export function calculateDaysOverdue(
    dateOfLastRendezvous: string,
    maximumDaysBetweenRendezvous: number
): number {
    if (dateOfLastRendezvous === null) {
        return null
    }
    return calculateDaysAgo(dateOfLastRendezvous) - maximumDaysBetweenRendezvous;
}