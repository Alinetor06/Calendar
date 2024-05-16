import * as React from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';
import PhoneField from './PhoneField';
import dayjs from 'dayjs';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//configurazioni
import { Visita } from '../../../config/Visite';




interface CardProps {
    visiteData: Visita[];
    attiva?: boolean
}


const priority_value = [
    {
        value: 0,
        label: 'GREEN'
    },
    {
        value: 1,
        label: 'ORANGE'
    },
    {
        value: 2,
        label: 'RED'
    }
];


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


    //Gestione errori

    const [errorName, setErrorName] = React.useState<string | undefined>(undefined);
    const [errorEmail, setErrorEmail] = React.useState<string | undefined>(undefined);


    const handleInputBlur = (inputValue: string, setError: (error: string | undefined) => void, validator: (value: string) => boolean, errorMessage: string) => {
        const error = validator(inputValue) ? undefined : errorMessage;
        setError(error);
    }


    const isValidEmail = (email: string): boolean => {
        return /\S+@\S+\.\S+/.test(email.trim());
    };

    const isValidName = (name: string): boolean => {
        return /^[a-zA-Z ]+$/.test(name.trim());// Allowing spaces in the name
    };


    function handleSaveNewVisit(event: React.FormEvent<HTMLFormElement>, visitId: number): void {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Estrai i valori dal FormData
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const date = data.get('date') as string; // Assicurati che l'id sia 'date' e non 'date_visit'
        const priority = data.get('priority') as string;
        const description = data.get('description') as string;
        const tel = data.get('tel') as string;

        // Aggiorna lo stato newVisit con i nuovi valori
        setUpdatedVisite(prevState => {
            const updatedVisiteCopy = [...prevState];
            const visitIndex = updatedVisiteCopy.findIndex(visit => visit.id === visitId);
            if (visitIndex !== -1) {
                updatedVisiteCopy[visitIndex] = {
                    ...updatedVisiteCopy[visitIndex],
                    name: name,
                    email: email,
                    priority: parseInt(priority), // Assicurati che priority sia un numero
                    date_visit: new Date(date), // Assicurati che la data venga parsata correttamente
                    description: description,
                    tel: tel // Non c'è un campo 'tel' nel FormData, quindi lo lascio vuoto
                };
            }
            return updatedVisiteCopy;
        });
    }

    console.log(updatedVisite)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                    <Box component="form" onSubmit={(e) => handleSaveNewVisit(e, v.id)} noValidate sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}>

                                        <TextField
                                            variant="standard"
                                            margin="normal"
                                            required
                                            id="name"
                                            label="Nome"
                                            name="name"
                                            defaultValue={v.name}
                                            disabled={!attivo}
                                            onBlur={(e) => handleInputBlur(e.target.value, setErrorName, isValidName, 'Nome non valido')}
                                            error={!!errorName}
                                            helperText={errorName}
                                            autoFocus
                                        />

                                        <TextField
                                            variant="standard"
                                            margin="normal"
                                            required
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            defaultValue={v.email}
                                            disabled={!attivo}
                                            onBlur={(e) => handleInputBlur(e.target.value, setErrorEmail, isValidEmail, 'Email non valida')}
                                            error={!!errorEmail}
                                            helperText={errorEmail}
                                            autoFocus
                                        />

                                        <TextField
                                            sx={{ mb: 1.5, ml: 1 }}
                                            select
                                            name='priority'
                                            label={'Priorità'}
                                            defaultValue={v.priority}
                                            disabled={!attivo}

                                        >
                                            {priority_value.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <DateField
                                            disablePast
                                            margin="normal"
                                            required
                                            defaultValue={dayjs(v.date_visit)}
                                            label="Data della Visita"
                                            name="date"
                                            id="date_visit"
                                            variant="standard"
                                            disabled={!attivo}
                                        />

                                        <TextField
                                            variant="standard"
                                            margin="normal"
                                            required
                                            id="description"
                                            label="Descrizione"
                                            name="description"
                                            defaultValue={v.description}
                                            autoFocus
                                            disabled={!attivo}
                                        />

                                        <PhoneField
                                            name='tel'
                                            label='Telefono'
                                            value={v.tel}
                                            placeholder='es. +39 0123456789'// Aggiungi questa riga
                                            disabled={!attivo}
                                        />



                                        <div className='button-box'>

                                            {attivo ? (
                                                <>
                                                    <Button
                                                        type='submit'
                                                        id='ButtonSave'
                                                        size="small"
                                                        variant="contained"
                                                        color="success"
                                                        disabled={!!errorName || !!errorEmail} // Disabilita il pulsante se c'è almeno un errore
                                                    >
                                                        Salva
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="error"
                                                        onClick={handleToggleEdit}
                                                    >
                                                        Annulla
                                                    </Button>

                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        id='ButtonEdit'
                                                        size="small"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleToggleEdit} // Chiamata alla funzione onOpenModal passando l'indice
                                                        disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                                    >
                                                        Modifica
                                                    </Button>

                                                    <Button
                                                        id='ButtonDelite'
                                                        size="small"
                                                        variant="contained"
                                                        color="error"
                                                        disabled={isPastDate} // Disabilita il bottone se la data è nel passato
                                                    >
                                                        Elimina
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </Box>
                                </div>


                            </CardContent>

                        </React.Fragment>
                    );
                })
                }
            </Card >
        </LocalizationProvider>
    );
}


export default View_Edit_Save_Cards;