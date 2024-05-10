import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box, Button } from '@mui/joy';
import { useState } from 'react';
import GenericField from '../GenericField';


//configurazioni
import { Visita } from '../../config/Visite';



const getDateOnly = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // aggiunge lo zero iniziale se necessario
    const day = date.getDate().toString().padStart(2, '0'); // aggiunge lo zero iniziale se necessario
    return `${year}-${month}-${day}`;
};


/**
* 
* SAVE VISITE
* 
*/

const Save_Visit_Card: React.FC<{ visiteData: Visita[] }> = ({ visiteData }) => {

    const [visite, setVisite] = useState(visiteData);

    const [newVisit, setNewVisit] = useState<Visita>({
        id: 0,
        name: '',
        email: '',
        priority: 0,
        date_visit: new Date(),
        description: '',
        tel: ''
    });


    const handleSaveNewVisit = () => {
        // Aggiungi la nuova visita all'array visite
        setVisite([...visite, newVisit]);
        // Resettare lo stato per prepararsi alla creazione di una nuova visita
        setNewVisit({
            id: 0,
            name: '',
            email: '',
            priority: 0,
            date_visit: new Date(),
            description: '',
            tel: ''
            // Rimuovi il carattere / in eccesso
        });
    };

    /** 
        const handleFieldChange = <T extends keyof typeof updatedVisite[0]>(index: number, field: T, value: typeof updatedVisite[0][T]) => {
            // Clona l'array updatedVisite per modificare solo l'elemento specifico
            const updatedVisiteCopy = [...updatedVisite];
            // Aggiorna il campo specificato dell'elemento specificato con il nuovo valore
            updatedVisiteCopy[index][field] = value;
            // Aggiorna lo stato con il nuovo array aggiornato
            setUpdatedVisite(updatedVisiteCopy);
        };
    */

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
                            value={newVisit.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVisit({ ...newVisit, name: e.target.value })}
                        />

                        <GenericField
                            label="Email"
                            value={newVisit.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVisit({ ...newVisit, email: e.target.value })}
                            placeholder="es. abcdefghi@abcde.abc"
                        />

                        <GenericField
                            label="Priorità"
                            value={newVisit.priority}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVisit({ ...newVisit, priority: parseInt(e.target.value) })}
                        />

                        <GenericField
                            label='Data della Visita'
                            value={getDateOnly(newVisit.date_visit)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVisit({ ...newVisit, date_visit: new Date(e.target.value) })}
                            placeholder="es. YYYY-MM-DD"
                        />

                        <GenericField
                            label="Descrizione"
                            value={newVisit.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVisit({ ...newVisit, description: e.target.value })}
                        />

                        <GenericField
                            label="Telefono"
                            value={newVisit.tel}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVisit({ ...newVisit, tel: e.target.value })}
                            placeholder="es. +39 0123456789"
                        />

                    </Box>
                </div>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <Button
                        size="sm"
                        variant="soft"
                        color="success"
                        onClick={handleSaveNewVisit} // Funzione per salvare la nuova visita
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