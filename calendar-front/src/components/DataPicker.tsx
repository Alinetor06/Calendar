import React from "react";
import Calendar from "./Calendar";

export const DataPicker: React.FC<{}> = ({ }) => {
    return (
        <div className="background-calendar-container">
            <h1 className='header-text-calendar'>Calendar </h1>
            <Calendar />
        </div>

    )
}