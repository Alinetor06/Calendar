import * as React from 'react';
import { Card, CardContent, Typography, Box, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

interface SearchVisitCardProps {
    onParamsChange: (params: { name: string; email: string; date: Date }) => void;
}

const Search_Visit_Card: React.FC<SearchVisitCardProps> = ({ onParamsChange }) => {



    const handleSearchVisits = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const date = data.get('date') as string; // Assicurati che l'id sia 'date' e non 'date_visit'

        console.log({
            name: name,
            email: email,
            date: date
        });

        onParamsChange({ name: name, email: email, date: new Date(date) });
    }



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



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                        <Box component="form" onSubmit={handleSearchVisits} noValidate sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}>
                            <Box display={'flex'}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
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
                                    variant="standard"
                                    margin="normal"
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onBlur={(e) => handleInputBlur(e.target.value, setErrorName, isValidName, 'Nome non valido')}
                                    error={!!errorName}
                                    helperText={errorName}
                                />
                                <DateField
                                    margin="normal"
                                    label="Data della Visita"
                                    name="date"
                                    id="date_visit"
                                    variant="standard"
                                />
                            </Box>


                            <div className='button-box'>
                                <Button
                                    type='submit'
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    disabled={!!errorName || !!errorEmail} // Disabilita il pulsante se c'è almeno un errore
                                >
                                    Cerca
                                </Button>

                                <Button
                                    size="small"
                                    variant="contained"
                                    color="warning"
                                >
                                    Resetta
                                </Button>
                            </div>
                        </Box>
                    </div>
                </CardContent>
            </Card>
        </LocalizationProvider>
    );
}

export default Search_Visit_Card;
