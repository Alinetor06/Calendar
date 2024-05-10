import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box, Button } from '@mui/joy';
import { useState } from 'react';
import GenericField from '../GenericField';

// Interfaccia per il tipo Visita
import { Visita } from '../../config/Visite';

const getDateOnly = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const Save_Visit_Card: React.FC = () => {
    const [newVisit, setNewVisit] = useState<Visita>({
        id: 0,
        name: '',
        email: '',
        priority: 0,
        date_visit: new Date(),
        description: '',
        tel: ''
    });

    const handleFieldChange = <T extends keyof Visita>(field: T, value: Visita[T]) => {
        // Crea una copia della nuova visita
        const newVisitCopy = { ...newVisit };
        // Aggiorna il campo specificato della nuova visita con il nuovo valore
        newVisitCopy[field] = value;
        // Aggiorna lo stato con la nuova visita aggiornata
        setNewVisit(newVisitCopy);
    };

    const handleSaveNewVisit = () => {
        // Qui puoi fare ciò che desideri con la nuova visita salvata
        console.log('Nuova visita salvata:', newVisit);
        // Aggiungi la logica per salvare la nuova visita, ad esempio inviare i dati al server, ecc.
        // Resetta il form dopo aver salvato la visita
        setNewVisit({
            id: 0,
            name: '',
            email: '',
            priority: 0,
            date_visit: new Date(),
            description: '',
            tel: ''
        });
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                    Creazione Visita:
                </Typography>
                <div className='save_visit_Model'>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}>

                        <GenericField
                            label="Nome"
                            value={newVisit.email}
                            onChange={(newValue) => handleFieldChange('name', newValue)}
                            placeholder="es. abcdefghi@abcde.abc"
                        />

                        <GenericField
                            label="Email"
                            value={newVisit.email}
                            onChange={(newValue) => handleFieldChange('email', newValue)}
                            placeholder="es. abcdefghi@abcde.abc"
                        />

                        <GenericField
                            label="Priorità"
                            value={newVisit.priority}
                            onChange={(newValue) => handleFieldChange('priority', newValue)}
                        />



                        <GenericField
                            label='Data della Visita'
                            value={getDateOnly(newVisit.date_visit)}
                            onChange={(newValue) => handleFieldChange('date_visit', new Date(newValue))}
                            placeholder="es. YYYY-MM-DD"
                        />

                        <GenericField
                            label="Descrizione"
                            value={newVisit.description}
                            onChange={(newValue) => handleFieldChange('description', newValue)}
                        />

                        <GenericField
                            label="Telefono"
                            value={newVisit.tel}
                            onChange={(newValue) => handleFieldChange('tel', newValue)}
                            placeholder="es. +39 0123456789 "

                        />
                    </Box>
                </div>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <Button
                        size="sm"
                        variant="soft"
                        color="success"
                        onClick={handleSaveNewVisit}
                    >
                        Salva
                    </Button>

                    <Button
                        size="sm"
                        variant="soft"
                        color="danger"
                    >
                        Annulla
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Save_Visit_Card;
