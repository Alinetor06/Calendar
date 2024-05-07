import React from "react";
import { useState } from 'react';
import Calendar from "./Calendar";
import { IconButton, Box, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Card from "../Card"

//configurazioni
import { Visita } from "../../config/Visite";

interface DataPickerProps {
    onOpenModal: (n: number, visita?: Visita) => void;

}

const [isDialogOpen, setIsDialogOpen] = useState(false);
const [activeCard, setActiveCard] = useState<Visita>();

const handleDialogOpen = (n: number, visita?: Visita) => {
    setIsDialogOpen(true);
    setActiveCard(visita);
};

const handleDialogClose = () => {
    setIsDialogOpen(false);
}

export const DataPicker: React.FC<DataPickerProps> = ({ onOpenModal }) => {




    return (
        <div className="background-calendar-container">
            <h1 className='header-text-calendar'>Calendar </h1>
            <>
                <div className="calendar_display">

                    <Calendar />
                    <IconButton onClick={() => onOpenModal(3)}>
                        <AddIcon />
                    </IconButton>
                </div>

            </>
        </div>

    )
}