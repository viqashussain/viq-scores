import moment from 'moment';

export function convertUtcDateToLocalTime(date: string): string {
    const stillUtc = moment.utc(date).toDate();
    const local = moment(stillUtc).local().format('LT');

    return local;
}

export function convertUtcDateToLocal(date: string): string {
    const stillUtc = moment.utc(date).toDate();
    const local = moment(stillUtc).local().format('MMMM Do YYYY, h:mm a');

    return local;
}