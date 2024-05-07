import * as React from 'react';
import { Card, CardContent, Typography, TextField } from '@mui/material';
import { Box, Button } from '@mui/joy';
import { useState } from 'react';
import GenericField from './GenericField';

//configurazioni
import { Visita } from '../config/Visite';



interface CardProps {
    visiteData: Visita[];
    onOpenModal: (n: number, attivo: boolean, visita?: Visita) => void;
    typo: number
    attiva?: boolean
}

const getDateOnly = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // aggiunge lo zero iniziale se necessario
    const day = date.getDate().toString().padStart(2, '0'); // aggiunge lo zero iniziale se necessario
    return `${year}-${month}-${day}`;
};


const ListStackRatio: React.FC<CardProps> = ({ visiteData, onOpenModal, typo, attiva }) => {

    const [attivo, setAttivo] = useState(attiva); // Inizialmente disattivo

    const handleToggleEdit = () => {
        setAttivo(!attivo); // Inverte lo stato di attivo (attiva/disattiva modalità di modifica)
        // Se desideri reimpostare eventuali valori del form ai valori iniziali quando disattivi la modalità di modifica,
        // puoi aggiungere qui la logica per farlo.
    };

    const today = new Date();

    /**
     * 
     * UPDATE VISITE
     * 
     */

    const [updatedVisite, setUpdatedVisite] = useState(visiteData);

    // Funzione per gestire la modifica della data di visita
    const handleFieldChange = <T extends keyof typeof updatedVisite[0]>(index: number, field: T, value: typeof updatedVisite[0][T]) => {
        // Clona l'array updatedVisite per modificare solo l'elemento specifico
        const updatedVisiteCopy = [...updatedVisite];
        // Aggiorna il campo specificato dell'elemento specificato con il nuovo valore
        updatedVisiteCopy[index][field] = value;
        // Aggiorna lo stato con il nuovo array aggiornato
        setUpdatedVisite(updatedVisiteCopy);
    };



    /**
    * 
    * SAVE VISITE
    * 
    */



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



    if (typo === 0) {
        return (
            <>
                <Card sx={{ minWidth: 275 }}>
                    {visiteData.map((v, index) => {
                        const visitDate = new Date(v.date_visit);
                        const isPastDate = visitDate < today;

                        return (
                            <React.Fragment key={index}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {v.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {v.description}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {v.priority}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    <Button
                                        size="sm"
                                        variant="soft"
                                        color="primary"
                                        onClick={() => onOpenModal(1, false, v)}
                                    >
                                        Visualizza
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="soft"
                                        color="warning"
                                        disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                        onClick={() => onOpenModal(1, true, v)}
                                    >
                                        Modifica
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="soft"
                                        color="danger"
                                        disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                    >
                                        Elimina
                                    </Button>
                                </Box>
                            </React.Fragment>
                        );
                    })}
                </Card>

            </>
        );
    }
    if (typo === 1) {
        return (
            <Card sx={{ minWidth: 275 }}>
                {visiteData.map((v, index) => {
                    const visitDate = new Date(v.date_visit);
                    const isPastDate = visitDate < today;

                    return (
                        <React.Fragment key={index}>
                            <CardContent>
                                {attivo ? (
                                    <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                                        Modifica Visita:
                                    </Typography>
                                ) : (
                                    <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                                        Visualizza Visita:
                                    </Typography>
                                )}

                                <div className='edit_visit_Model'>
                                    <Box component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}>
                                        <GenericField
                                            label="Nome"
                                            value={v.name}
                                            onChange={(newValue) => handleFieldChange(index, 'name', newValue)}
                                            disabled={!attivo}
                                        />

                                        <GenericField
                                            label="Email"
                                            value={v.email}
                                            onChange={(newValue) => handleFieldChange(index, 'email', newValue)}
                                            placeholder="es. abcdefghi@abcde.abc"
                                            disabled={!attivo}
                                        />

                                        <GenericField
                                            label="Priorità"
                                            value={v.priority}
                                            onChange={(newValue) => handleFieldChange(index, 'priority', newValue)}
                                            disabled={!attivo}
                                        />



                                        <GenericField
                                            label='Data della Visita'
                                            value={getDateOnly(v.date_visit)}
                                            onChange={(newValue) => handleFieldChange(index, 'date_visit', new Date(newValue))}
                                            placeholder="es. YYYY-MM-DD"
                                            disabled={!attivo}
                                        />

                                        <GenericField
                                            label="Descrizione"
                                            value={v.description}
                                            onChange={(newValue) => handleFieldChange(index, 'description', newValue)}
                                            disabled={!attivo}
                                        />

                                        <GenericField
                                            label="Telefono"
                                            value={v.tel}
                                            onChange={(newValue) => handleFieldChange(index, 'tel', newValue)}
                                            placeholder="es. +39 0123456789 "
                                            disabled={!attivo}
                                        />

                                    </Box>
                                </div>


                            </CardContent>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>

                                {attivo ? (
                                    <>
                                        <Button
                                            size="sm"
                                            variant="soft"
                                            color="success"
                                        >
                                            Salva
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="soft"
                                            color="danger"
                                            onClick={handleToggleEdit}
                                        >
                                            Annulla
                                        </Button>

                                    </>
                                ) : (
                                    <>
                                        <Button
                                            size="sm"
                                            variant="soft"
                                            color="primary"
                                            onClick={handleToggleEdit} // Chiamata alla funzione onOpenModal passando l'indice
                                            disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                        >
                                            Modifica
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="soft"
                                            color="danger"
                                            disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                        >
                                            Elimina
                                        </Button>
                                    </>
                                )}


                            </Box>
                        </React.Fragment>
                    );
                })
                }
            </Card >
        );
    }
    else {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                        Creazione Visita:
                    </Typography>
                    <div className='edit_visit_Model'>
                        <div className='row_card_1'>
                            <TextField
                                sx={{ mb: 1.5, ml: 1 }}
                                label="Nome"
                                variant="standard"
                                value={newVisit.name} // Nuovo stato per contenere i dati della nuova visita
                                onChange={(e) => setNewVisit({ ...newVisit, name: e.target.value })} // Aggiorna il valore del campo nel nuovo stato
                            />

                            <TextField
                                sx={{ mb: 1.5, ml: 1 }}
                                label='Email'
                                variant="standard"
                                value={newVisit.email} // Nuovo stato per contenere i dati della nuova visita
                                onChange={(e) => setNewVisit({ ...newVisit, email: e.target.value })} // Aggiorna il valore del campo nel nuovo stato
                            />

                            <TextField
                                sx={{ mb: 1.5, ml: 1 }}
                                label="Priorità"
                                variant="standard"
                                type='number'
                                value={newVisit.priority} // Nuovo stato per contenere i dati della nuova visita
                                onChange={(e) => setNewVisit({ ...newVisit, priority: parseInt(e.target.value) || 0 })} // Aggiorna il valore del campo nel nuovo stato
                            />
                        </div>
                        <div className='row_card_2'>
                            <TextField
                                sx={{ mb: 1.5, ml: 1 }}
                                label='Data della Visita'
                                type="date"
                                value={newVisit.date_visit} // Nuovo stato per contenere i dati della nuova visita
                                onChange={(e) => setNewVisit({ ...newVisit, date_visit: new Date(e.target.value) })} // Aggiorna il valore del campo nel nuovo stato
                            />


                            <TextField
                                sx={{ mb: 1.5, ml: 1 }}
                                label="Descrizione"
                                variant="standard"
                                defaultValue={newVisit.description}
                                onChange={(e) => {
                                    // Aggiorna il valore del campo nel tuo stato
                                }}
                            />

                            <TextField
                                sx={{ mb: 1.5, ml: 1 }}
                                label="Telefono"
                                variant="standard"
                                defaultValue={newVisit.tel}
                                onChange={(e) => {
                                    // Aggiorna il valore del campo nel tuo stato
                                }}
                            />
                        </div>
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
}

export default ListStackRatio;
