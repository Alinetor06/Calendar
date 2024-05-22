import * as React from 'react';
import { Card, CardContent, MenuItem, TextField, Typography, Box, Button } from '@mui/material';
import { useState } from 'react';
import PhoneField from './PhoneField';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axiosClient from '../../../axios-client';
import { useNavigate } from 'react-router-dom';
//import { useStateContext } from '../../../context/ContextProvider';


const priority_value = [
    { value: 0, label: 'GREEN' },
    { value: 1, label: 'ORANGE' },
    { value: 2, label: 'RED' }
];



const Save_Visit_Card: React.FC = () => {

    const navigate = useNavigate();
    //const { user } = useStateContext();

    const [priority, setPriority] = useState(0);

    const handlePriorityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPriority(event.target.value as number);
    };


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

        axiosClient.post('/visits', {
            name: data.get('name'),
            email: data.get('email'),
            visit_day: data.get('visit_day'),
            priority: data.get('priority'),
            description: data.get('description'),
            tel: data.get('tel')
        })
            .then((response) => {
                console.log(response);
                navigate('/CalendarSecretary');
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
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
                                name="visit_day"
                                id="visit_day"
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