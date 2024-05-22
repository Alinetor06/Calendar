import * as React from 'react';
import { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import { Visita } from '../../../configuration/Visite'
import axiosClient from '../../../axios-client';


interface DatePickerProps {
    onDateChange: (date: Dayjs | null) => void;
}

export default function DatePicker({ onDateChange }: DatePickerProps) {


    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null); // Aggiorna il tipo di stato
    const [dati, setDati] = React.useState<Visita[]>([]);
    const [isLoadingMonth, setIsLoadingMonth] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        getData();
    }, []);


    const getData = () => {
        setIsLoading(true);
        axiosClient.get<{ visite: Visita[] }>('/visits', {})
            .then(({ data }) => {
                console.log(data);
                setIsLoading(false);
                setDati(data.visite); // Accedi all'array di visite
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    };


    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        onDateChange(date); // Chiama la prop onDateChange con il nuovo valore di selectedDate
    };

    const handleMonthChange = () => {
        setIsLoadingMonth(true);
        // Simulate loading for demonstration purposes
        setTimeout(() => {
            setIsLoadingMonth(false);
        }, 500);
    };

    // Estrai solo le date dallo stato dati
    const highlightedDates = dati.map(visita => new Date(visita.visit_day));

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
                    loading={isLoadingMonth}
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