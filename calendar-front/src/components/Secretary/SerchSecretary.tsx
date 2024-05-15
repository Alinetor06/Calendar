import { Visita } from '../../config/Visite';
import { CardSlider } from './ShowCard/ShowSlideCard'
import Search_Visit_Card from './TypoCard/SearchCard';
import React, { useState } from 'react';




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





const SearchSecretary: React.FC<{}> = ({ }) => {

    const [searchParams, setSearchParams] = useState<{ name: string, email: string, date: Date }>({
        name: '',
        email: '',
        date: new Date()
    });

    const handleSearchParams = (params: { name: string; email: string; date: Date }) => {
        // Qui puoi fare ciò che desideri con i parametri di ricerca, ad esempio inviarli al componente SearchSecretary
        setSearchParams(params);
        console.log('Parametri di ricerca:', searchParams);
    };



    return (
        <div className="background-container">
            <h1 className='header-text-calendar'>Cerca Visite </h1>
            <div className='serch-container'>
                <Search_Visit_Card onParamsChange={handleSearchParams} />
            </div>
            <CardSlider data={dati} />
        </div>
    );
};

export default SearchSecretary;