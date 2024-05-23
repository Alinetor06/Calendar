import { Visita } from '../configuration/Visite';
import { CardSlider } from '../components/Secretary/ShowCard/ShowSlideCard';
import Search_Visit_Card from '../components/Secretary/TypoCard/SearchCard';
import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';


const SearchSecretary: React.FC<{}> = ({ }) => {
    const [visits, setVisits] = useState<Visita[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useState<{ name: string, email: string, date: Date }>({
        name: '',
        email: '',
        date: new Date()
    });

    const getData = (name?: string, email?: string, visit_day?: string) => {
        setIsLoading(true);
        axiosClient.get<{ visits: Visita[] }>('/visits/search', {
            params: { name, email, visit_day }
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


        const { name, email, date } = searchParams;

        // Crea una nuova data e aggiungi un giorno
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const formattedDate = nextDay.toISOString().split('T')[0];// Formatta la data in YYYY-MM-DD

        console.log(`Fetching visits for params: name=${name}, email=${email}, date=${formattedDate}`);

        getData(name, email, formattedDate); // Passa tutti i parametri di ricerca
    }, [searchParams]);

    const handleSearchParams = (params: { name: string; email: string; date: Date }) => {
        setSearchParams(params);
        console.log('Parametri di ricerca:', params);
    };

    return (
        <div className="background-container">
            <h1 className='header-text-calendar'>Cerca Visite </h1>
            <div className='search-container'>
                <Search_Visit_Card onParamsChange={handleSearchParams} />
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <CardSlider data={visits} />
            )}
        </div>
    );
};

export default SearchSecretary;
