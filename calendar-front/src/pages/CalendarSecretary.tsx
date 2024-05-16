import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataPicker from '../components/Secretary/Calendar/DataPicker';
import { CardSlider } from '../components/Secretary/ShowCard/ShowSlideCard';
import ModalComponent from '../components/Secretary/ShowCard/ModalComponent';
import { Dayjs } from 'dayjs';
import axios from "axios";

//configurazione
import { Visita } from '../config/Visite';


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


    const date: Visita[] = []

    useEffect(() => {
        axios.get
    })



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

                <CardSlider data={date} />
            </div>
        </>
    );
};

export default CalendarSecretary;
