import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataPicker from '../components/Secretary/Calendar/DataPicker';
import { CardSlider } from '../components/Secretary/ShowCard/ShowSlideCard';
import ModalComponent from '../components/Secretary/ShowCard/ModalComponent';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc'; // Importa il plugin utc

// configurazione
import { Visita } from '../configuration/Visite';
import axiosClient from '../axios-client';

dayjs.extend(utc); // Estendi dayjs con il plugin utc

const CalendarSecretary: React.FC<{}> = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Usa Dayjs invece di Date
    const [isLoading, setIsLoading] = useState(false);
    const [visits, setVisits] = useState<Visita[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            const nextDay = date.add(1, 'day'); // Aggiungi un giorno alla data selezionata
            setSelectedDate(nextDay); // Imposta la data successiva
        } else {
            setSelectedDate(null);
        }
    };



    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const getData = (visit_day?: string) => {
        setIsLoading(true);
        axiosClient.get<{ visits: Visita[] }>('/visits/search', {
            params: { visit_day }
        })
            .then(({ data }) => {
                console.log(data);
                setVisits(data.visits); // Aggiorna lo stato con i dati ottenuti
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setVisits([]);
            });
    };

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate.utc().format('YYYY-MM-DD'); // Formatta la data in UTC
            console.log(`Fetching visits for date: ${formattedDate}`); // Aggiungi un log per verificare la data
            getData(formattedDate); // Recupera i dati quando la data cambia
        } else {
            getData(); // Recupera tutti i dati se nessuna data è selezionata
        }
    }, [selectedDate]);

    return (
        <>
            <div className="background-container">
                <h1 className='header-text-calendar'>Calendario delle Visite</h1>
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

                <CardSlider data={visits} />
            </div>
        </>
    );
};

export default CalendarSecretary;
