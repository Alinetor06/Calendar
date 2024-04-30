import React from "react";
import Card from "./Card";
import { Visita } from '../config/Visite';

export const CardShow: React.FC = () => {

    const data: Visita[] = [
        {
            name: 'Night view',
            description: '4.21M views',
            priority: 1
        },
        {
            name: 'Lake view',
            description: '4.74M views',
            priority: 1
        },
        {
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1
        },
    ];

    return (
        <div className="background-carousel-container">
            <h2 className='header-text-show'>Visite:</h2>
            <div className="card-container">
                {/* Utilizza il metodo map per generare una Card per ogni elemento in data */}
                {data.map((visita, index) => (
                    <Card key={index} visite={[visita]} />
                ))}
            </div>

        </div>
    )
}

