import React, { useEffect, useState } from "react";

import DataPicker from "./DataPicker";
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ModalComponent from "../ShowCard/ModalComponent";
import { Visita } from "../../../config/Visite";




export const Calendar: React.FC<{}> = ({ }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dati, setDati] = useState<Visita[]>([]);

    useEffect(() => {
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

    const handleModalOpen = () => {
        setIsModalOpen(true);

    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    }




    return (
        <div className="background-calendar-container">
            <>
                <div className="calendar_display">

                    <DataPicker highlightedDates={dati.map(visita => visita.date_visit)} />

                    <IconButton onClick={handleModalOpen}>
                        <AddIcon />
                    </IconButton>

                    {isModalOpen && (
                        <ModalComponent isOpen={isModalOpen} onClose={handleModalClose} typeModel={1} />
                    )}
                </div>

            </>
        </div>

    )
}