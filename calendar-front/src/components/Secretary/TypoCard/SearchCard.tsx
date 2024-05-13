import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box, Button } from '@mui/joy';
import { useState } from 'react';
import GenericField from '../GenericField';



const Search_Visit_Card: React.FC = () => {
    const [searchParams, setSearchParams] = useState<{ name: string, email: string, date: Date }>({
        name: '',
        email: '',
        date: new Date()
    });

    const handleFieldChange = <T extends keyof typeof searchParams>(field: T, value: typeof searchParams[T]) => {
        // Crea una copia dei parametri di ricerca
        const searchParamsCopy = { ...searchParams };
        // Aggiorna il campo specificato dei parametri di ricerca con il nuovo valore
        searchParamsCopy[field] = value;
        // Aggiorna lo stato con i nuovi parametri di ricerca aggiornati
        setSearchParams(searchParamsCopy);
    };

    const handleSearchVisits = () => {
        // Qui puoi fare ciò che desideri con i parametri di ricerca
        console.log('Parametri di ricerca:', searchParams);
        // Aggiungi la logica per cercare le visite corrispondenti ai parametri
        // Resetta il form dopo la ricerca
        setSearchParams({
            name: '',
            email: '',
            date: new Date()
        });
    };

    return (
        <Card sx={{
            minWidth: 275,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <CardContent >
                <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                    Cerca Visita:
                </Typography>
                <div className='search_visit_Model'>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}>

                        <GenericField
                            label="Nome"
                            value={searchParams.name}
                            onChange={(newValue) => handleFieldChange('name', newValue)}
                            placeholder="Inserisci il nome"
                        />

                        <GenericField
                            label="Email"
                            value={searchParams.email}
                            onChange={(newValue) => handleFieldChange('email', newValue)}
                            placeholder="Inserisci 'email"
                        />

                        <GenericField
                            label='Data della Visita'
                            value={''}
                            onChange={(newValue) => handleFieldChange('date', new Date(newValue))}
                            placeholder="es. YYYY-MM-DD"
                        />
                    </Box>
                </div>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <Button
                        size="sm"
                        variant="soft"
                        color="primary"
                        onClick={handleSearchVisits}
                    >
                        Cerca
                    </Button>

                    <Button
                        size="sm"
                        variant="soft"
                        color="warning"
                    >
                        Resetta
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Search_Visit_Card;

