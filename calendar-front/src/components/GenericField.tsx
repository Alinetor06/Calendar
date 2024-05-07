import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';

interface FieldProps<T> {
    label: string;
    value: T;
    onChange: (value: T) => void;
    placeholder?: string; // Aggiungi questa riga
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

const GenericField = <T extends string | number | Date>({ label, value, onChange, placeholder }: FieldProps<T>) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setInputValue(value?.toString() ?? ''); // Update inputValue when value changes
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        let newValue: T = value as T;

        if (label === 'Data della Visita' && typeof value === 'string') {
            const parsedDate = new Date(inputValue);
            if (isNaN(parsedDate.getTime())) {
                setError('Data non valida');
                return;
            }

            // Controllo se il valore inserito è una data precedente a quella odierna
            if (parsedDate < new Date()) {
                setError('La data non può essere precedente a quella odierna');
                return;
            }
            newValue = parsedDate as T;

        } else if (typeof value === 'string') {
            if ((label === 'Nome') && !isValidName(inputValue)) {
                setError(`${label} non valido`);
                return;
            }
            if (label === 'Email' && !isValidEmail(inputValue)) {
                setError('Email non valida');
                return;
            }
            if (label === 'Telefono' && !isValidPhoneNumber(inputValue)) {
                setError('Numero di telefono non valido');
                return;
            }
        }
        setError(undefined); // Clear error when no validation issues
        onChange(newValue);
    };

    const isValidEmail = (email: string): boolean => {
        return /\S+@\S+\.\S+/.test(email.trim());
    };

    const isValidName = (name: string): boolean => {
        return /^[a-zA-Z ]+$/.test(name.trim());// Allowing spaces in the name
    };

    const isValidPhoneNumber = (phoneNumber: string): boolean => {
        // Utilizza un'espressione regolare per verificare il formato del numero di telefono
        return /^[+]?[(]?[0-9 ]{3}[)]?[-\s\.]?[0-9 ]{3}[-\s\.]?[0-9 ]{4,6}$/.test(phoneNumber);
    };

    return (
        <>
            {label === 'Priorità' ? (
                <TextField
                    sx={{ mb: 1.5, ml: 1 }}
                    select
                    label={label}
                    value={value ?? ''} // Utilizza direttamente il valore fornito dalla prop
                    onChange={(e) => onChange(e.target.value as T)} // Aggiorna il valore selezionato
                    onBlur={handleInputBlur}
                >
                    {priority_value.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            ) : (
                <TextField
                    sx={{ mb: 1.5, ml: 1 }}
                    id={label}
                    label={label}
                    variant="standard"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    error={!!error}
                    helperText={error}
                    placeholder={placeholder} // Aggiungi questa riga
                />
            )}
        </>
    );
};

export default GenericField;