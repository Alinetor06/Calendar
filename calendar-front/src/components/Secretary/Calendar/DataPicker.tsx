import * as React from 'react';
import { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import { Visita } from '../../../config/Visite';

interface DatePickerProps {
    onDateChange: (date: Dayjs | null) => void;
}

export default function DatePicker({ onDateChange }: DatePickerProps) {


    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null); // Aggiorna il tipo di stato
    const [dati, setDati] = React.useState<Visita[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setDati([
            {
                id: 1,
                name: 'Night view',
                description: '4.21M views',
                priority: 1,
                date_visit: new Date('2024-05-30'),
                email: 'adkmvoadvokm@gmail.com',
                tel: '+39323253252'

            },
            {
                id: 2,
                name: 'Lake view',
                description: '4.74M views',
                priority: 1,
                date_visit: new Date('2024-05-12'),
                email: 'adkmvoadvokm@gmail.com',
                tel: '+39323253252'
            },
            {
                id: 3,
                name: 'Mountain view',
                description: '3.98M views',
                priority: 1,
                date_visit: new Date('2024-04-03'),
                email: 'adkmvoadvokm@gmail.com',
                tel: '+39323253252'
            },
            {
                id: 4,
                name: 'Mountain view',
                description: '3.98M views',
                priority: 1,
                date_visit: new Date('2024-02-03'),
                email: 'adkmvoadvokm@gmail.com',
                tel: '+39323253252'
            },
            {
                id: 5,
                name: 'Mountain view',
                description: '3.98M views',
                priority: 1,
                date_visit: new Date('2024-05-01'),
                email: 'adkmvoadvokm@gmail.com',
                tel: '+39323253252'
            },
            {
                id: 6,
                name: 'Mountain view',
                description: '3.98M views',
                priority: 1,
                date_visit: new Date('2024-05-05'),
                email: 'adkmvoadvokm@gmail.com',
                tel: '+39323253252'
            },

        ])
    }, []);

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        onDateChange(date); // Chiama la prop onDateChange con il nuovo valore di selectedDate
    };

    const handleMonthChange = () => {
        setIsLoading(true);
        // Simulate loading for demonstration purposes
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    // Estrai solo le date dallo stato dati
    const highlightedDates = dati.map(visita => visita.date_visit);

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

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={selectedDate} // Utilizza value invece di defaultValue
                    onChange={handleDateChange} // Aggiorna lo stato quando la data viene cambiata
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