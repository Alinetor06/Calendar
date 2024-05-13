import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

const initialValue = dayjs();

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDates?: Date[] }) {
    const { highlightedDates = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected = !outsideCurrentMonth && highlightedDates.some(date => day.isSame(date, 'day'));

    return (
        <Badge
            key={day.toString()}
            overlap='circular'
            badgeContent={isSelected ? <CheckIcon sx={{ color: green['A400'] }} /> : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

export default function DateCalendarServerRequest({ highlightedDates }: { highlightedDates?: Date[] }) {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleMonthChange = () => {
        setIsLoading(true);
        // Simulate loading for demonstration purposes
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    defaultValue={initialValue}
                    loading={isLoading}
                    onMonthChange={handleMonthChange}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDates,
                        } as any,
                    }}
                />
            </LocalizationProvider>
        </>
    );
}
