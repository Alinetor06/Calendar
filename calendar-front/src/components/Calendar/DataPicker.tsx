import React, { useState } from "react";

import Calendar from "./Calendar";
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ModalComponent from "../ModalComponent";




export const DataPicker: React.FC<{}> = ({ }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    }



    return (
        <div className="background-calendar-container">
            <h1 className='header-text-calendar'>Calendar </h1>
            <>
                <div className="calendar_display">
                    <ModalComponent isOpen={isModalOpen} onClose={handleModalClose} typeModel={2} />

                    <Calendar />
                    <IconButton onClick={handleModalOpen}>
                        <AddIcon />
                    </IconButton>
                </div>

            </>
        </div>

    )
}