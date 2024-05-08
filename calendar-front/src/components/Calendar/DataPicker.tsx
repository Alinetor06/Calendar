import React from "react";

import Calendar from "./Calendar";
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';





export const DataPicker: React.FC<{}> = ({ }) => {




    return (
        <div className="background-calendar-container">
            <h1 className='header-text-calendar'>Calendar </h1>
            <>
                <div className="calendar_display">

                    <Calendar />
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </div>

            </>
        </div>

    )
}