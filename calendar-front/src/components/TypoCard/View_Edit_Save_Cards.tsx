import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box, Button } from '@mui/joy';
import { useState } from 'react';
import GenericField from '../GenericField';


//configurazioni
import { Visita } from '../../config/Visite';



interface CardProps {
    visiteData: Visita[];
    attiva?: boolean
}

const getDateOnly = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // aggiunge lo zero iniziale se necessario
    const day = date.getDate().toString().padStart(2, '0'); // aggiunge lo zero iniziale se necessario
    return `${year}-${month}-${day}`;
};


const View_Edit_Save_Cards: React.FC<CardProps> = ({ visiteData, attiva }) => {


    /**
     * 
     * UPDATE VISITE
     * 
     */


    const [attivo, setAttivo] = useState(attiva); // Inizialmente disattivo

    const handleToggleEdit = () => {
        setAttivo(!attivo); // Inverte lo stato di attivo (attiva/disattiva modalità di modifica)
        // Se desideri reimpostare eventuali valori del form ai valori iniziali quando disattivi la modalità di modifica,
        // puoi aggiungere qui la logica per farlo.
    };

    const today = new Date();



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
                                        id='ButtonSave'
                                        size="sm"
                                        variant="soft"
                                        color="success"
                                    >
                                        Salva
                                    </Button>
                                    <Button
                                        id='ButtonBack'
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
                                        id='ButtonEdit'
                                        size="sm"
                                        variant="soft"
                                        color="primary"
                                        onClick={handleToggleEdit} // Chiamata alla funzione onOpenModal passando l'indice
                                        disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                    >
                                        Modifica
                                    </Button>

                                    <Button
                                        id='ButtonDelite'
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


export default View_Edit_Save_Cards;