import {DateTime} from "luxon"; '@types/luxon';
export const getInitials = (name: string, surname: string): string => `${name[0]}${surname[0]}`.toUpperCase();

export const sortDates = (dateA: DateTime, dateB: DateTime) => {
    if (dateA < dateB) {
        return 1;
    } else if ((dateA < dateB)) {
        return -1;
    }

    return 0;
}
