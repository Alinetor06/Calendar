import * as React from 'react';
import { Card, CardContent, Typography, TextField } from '@mui/material';
import { Visita } from '../config/Visite';
import { Box, Button } from '@mui/joy';
import { useState } from 'react';



interface CardProps {
    visite: Visita[];
    onOpenModal: (visita: Visita, n: boolean) => void;
    typo: number
}

const ListStackRatio: React.FC<CardProps> = ({ visite, onOpenModal, typo }) => {

    const today = new Date();

    const [updatedVisite, setUpdatedVisite] = useState(visite);

    // Funzione per gestire la modifica della data di visita
    const handleDateChange = (index: number, newDate: string) => {
        // Converti la stringa della nuova data in un oggetto Date
        const dateObject = new Date(newDate);

        // Copia l'array delle visite e aggiorna la data di visita della visita corrente
        const updatedVisiteCopy = [...updatedVisite];
        updatedVisiteCopy[index].date_visit = dateObject;

        // Aggiorna lo stato con le visite aggiornate
        setUpdatedVisite(updatedVisiteCopy);
    };


    if (typo === 0) {
        return (
            <>
                <Card sx={{ minWidth: 275 }}>
                    {visite.map((v, index) => {
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
                                        onClick={() => onOpenModal(v, false)}
                                    >
                                        Visualizza
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="soft"
                                        color="warning"
                                        disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                        onClick={() => onOpenModal(v, true)}
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
            <>
                <Card sx={{ minWidth: 275 }}>
                    {visite.map((v, index) => {
                        const visitDate = new Date(v.date_visit);
                        const isPastDate = visitDate < today;

                        return (
                            <React.Fragment key={index}>
                                <CardContent>
                                    <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                                        Visita: {visitDate.toDateString()}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5, ml: 1 }} variant="h4" component="div">
                                        Nome:<div className='card_info'>{v.name}</div>
                                    </Typography>

                                    <Typography sx={{ mb: 1.5, ml: 1 }} variant="h4" component="div">
                                        Priorità: <div className='card_info'>   {v.priority} </div>
                                    </Typography>


                                    <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                                        Descrizione: <div className='card_info'> {v.description}</div>
                                    </Typography>


                                    <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                                        Età:   <div className='card_info'>{v.email}</div>
                                    </Typography>

                                    <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                                        Tel. :   <div className='card_info'> {v.tel}   </div>
                                    </Typography>

                                </CardContent>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>

                                    <Button
                                        size="sm"
                                        variant="soft"
                                        color="warning"
                                        disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                        onClick={() => onOpenModal(v, true)}
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
    else {
        return (
            <Card sx={{ minWidth: 275 }}>
                {visite.map((v, index) => {

                    return (
                        <React.Fragment key={index}>
                            <CardContent>
                                <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                                    Modifica Visita:
                                </Typography>
                                <div className='edit_visit_Model'>
                                    <div className='row_card_1'>
                                        <TextField
                                            sx={{ mb: 1.5, ml: 1 }}
                                            label="Nome"
                                            variant="standard"
                                            defaultValue={v.name}
                                            onChange={(e) => {
                                                // Aggiorna il valore del campo nel tuo stato
                                            }}
                                        />

                                        <TextField
                                            sx={{ mb: 1.5, ml: 1 }}
                                            label='Email'
                                            variant="standard"
                                            defaultValue={v.email}
                                            onChange={(e) => handleDateChange(index, e.target.value)}
                                        />

                                        <TextField
                                            sx={{ mb: 1.5, ml: 1 }}
                                            label="Priorità"
                                            variant="standard"
                                            defaultValue={v.priority}
                                            onChange={(e) => {
                                                // Aggiorna il valore del campo nel tuo stato
                                            }}
                                        />
                                    </div>
                                    <div className='row_card_2'>

                                        <TextField
                                            sx={{ mb: 1.5, ml: 1 }}
                                            label='Data della Visita'
                                            type="date"
                                            defaultValue={v.date_visit ? v.date_visit.toISOString().split('T')[0] : ''}
                                            onChange={(e) => handleDateChange(index, e.target.value)}
                                        />

                                        <TextField
                                            sx={{ mb: 1.5, ml: 1 }}
                                            label="Descrizione"
                                            variant="standard"
                                            defaultValue={v.description}
                                            onChange={(e) => {
                                                // Aggiorna il valore del campo nel tuo stato
                                            }}
                                        />

                                        <TextField
                                            sx={{ mb: 1.5, ml: 1 }}
                                            label="Telefono"
                                            variant="standard"
                                            defaultValue={v.tel}
                                            onChange={(e) => {
                                                // Aggiorna il valore del campo nel tuo stato
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Altri campi del form */}

                            </CardContent>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
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
                                >
                                    Annulla
                                </Button>
                            </Box>
                        </React.Fragment>
                    );
                })}
            </Card>
        );
    }
}

export default ListStackRatio;
