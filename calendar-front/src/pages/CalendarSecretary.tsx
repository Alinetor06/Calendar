import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataPicker from '../components/Secretary/Calendar/DataPicker';
import { CardSlider } from '../components/Secretary/ShowCard/ShowSlideCard';
import ModalComponent from '../components/Secretary/ShowCard/ModalComponent';
import { Visita } from '../config/Visite';
import { Dayjs } from 'dayjs';


const CalendarSecretary: React.FC<{}> = () => {


    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date ? date.toDate() : null); // Converti Dayjs in Date
    };


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };



    const dati: Visita[] = [
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

    ];

    return (
        <>
            <div className="background-container">


                <h1 className='header-text-calendar'>Calendario delle Visite </h1>
                <div className="background-calendar-container">
                    <div className="calendar_display">

                        <DataPicker onDateChange={handleDateChange} />

                        <IconButton onClick={handleModalOpen}>
                            <AddIcon />
                        </IconButton>
                        {isModalOpen && (
                            <ModalComponent isOpen={isModalOpen} onClose={handleModalClose} typeModel={1} />
                        )}
                    </div>
                </div>

                <CardSlider data={dati} />
            </div>
        </>
    );
};

export default CalendarSecretary;
