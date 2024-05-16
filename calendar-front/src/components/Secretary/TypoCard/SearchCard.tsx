import * as React from 'react';
import { Card, CardContent, Typography, Box, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

interface SearchVisitCardProps {
    onParamsChange: (params: { name: string; email: string; date: Date }) => void;
}

const Search_Visit_Card: React.FC<SearchVisitCardProps> = ({ onParamsChange }) => {


    const [error, setError] = React.useState<string | undefined>(undefined);


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



    const handleInputBlur = (label: string, inputValue: string, setError: any) => {

        if ((label === 'Nome') && !isValidName(inputValue)) {
            setError(`${label} non valido`);
            return;
        }
        if (label === 'Email' && !isValidEmail(inputValue)) {
            setError('Email non valida');
            return;
        }
        setError(undefined); // Clear error when no validation issues
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
                                    required
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onBlur={(e) => handleInputBlur('Email', e.target.value, setError)}
                                    error={!!error}
                                    autoFocus

                                />
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onBlur={(e) => handleInputBlur('Nome', e.target.value, setError)}
                                    error={!!error}
                                />
                                <DateField
                                    margin="normal"
                                    required
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
