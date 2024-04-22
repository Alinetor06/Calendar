import { Date } from "../../types";


function generateday(): Date[] {
    let dates: Date[] = [];
    for (let i = 1; i < 29; i++) {
        let date: Date = { day: i };
        dates.push(date);
    }
    return dates;
}

export const monthDay: Date[] = generateday();
