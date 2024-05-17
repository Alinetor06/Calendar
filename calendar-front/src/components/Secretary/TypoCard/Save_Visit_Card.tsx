import * as React from 'react';
import { Card, CardContent, MenuItem, TextField, Typography, Box, Button } from '@mui/material';
import { useState } from 'react';
import PhoneField from './PhoneField';
import { Visita } from '../../../config/Visite';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';


const priority_value = [
    { value: 0, label: 'GREEN' },
    { value: 1, label: 'ORANGE' },
    { value: 2, label: 'RED' }
];

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const Save_Visit_Card: React.FC = () => {

    const [priority, setPriority] = useState(0);

    const handlePriorityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPriority(event.target.value as number);
    };

    const [newVisit, setNewVisit] = useState<Visita>();

    //Gestione degli errori

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

    //Gestione della Save Visit

    const handleSaveNewVisit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        axios.post('http://localhost:8000/api/visite', {
            name: data.get('name'),
            email: data.get('email'),
            visit_day: data.get('date'), // Assicurati di usare 'visit_day' invece di 'visit_date'
            priority: data.get('priority'),
            description: data.get('description'),
            tel: data.get('tel')
        }, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        setNewVisit({
            id: 0, // Potresti voler generare un id univoco per la nuova visita
            name: data.get('name') as string,
            email: data.get('email') as string,
            priority: parseInt(data.get('priority') as string), // Assicurati che priority sia un numero
            date_visit: new Date(data.get('date') as string), // Assicurati che la data venga parsata correttamente
            description: data.get('description') as string,
            tel: data.get('tel') as string // Non c'è un campo 'tel' nel FormData, quindi lo lascio vuoto
        });

        console.log('Nuova visita salvata:', newVisit);
    };





    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                        Creazione Visita:
                    </Typography>
                    <div className='save_visit_Model'>
                        <Box component="form" onSubmit={handleSaveNewVisit} noValidate sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                id="name"
                                label="Nome"
                                name="name"
                                autoComplete="name"
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
                                autoComplete="email"
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
                                value={priority}
                                onChange={handlePriorityChange}

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
                                label="Data della Visita"
                                name="date"
                                id="date_visit"
                                variant="standard"
                            />

                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                id="description"
                                label="Descrizione"
                                name="description"
                                autoFocus
                            />

                            <PhoneField
                                name='tel'
                                label='Telefono'
                                value=''
                                placeholder='es. +39 0123456789'// Aggiungi questa riga
                            />



                            <div className='button-box'>

                                <Button
                                    type='submit'
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
                                >
                                    Annulla
                                </Button>
                            </div>
                        </Box>
                    </div>
                </CardContent>
            </Card >
        </LocalizationProvider>
    );
}

export default Save_Visit_Card;