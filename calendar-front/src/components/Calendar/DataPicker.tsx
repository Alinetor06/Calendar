import React from "react";
import Calendar from "./Calendar";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Visita } from "../../config/Visite";

interface DataPickerProps {
    onOpenModal: (n: number, visita?: Visita) => void;
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