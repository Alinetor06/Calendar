import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

interface FieldProps {
    label: string;
    value: string
    name: string
    placeholder?: string; // Aggiungi questa riga
    disabled?: boolean
    error?: string
}

const PhoneField = ({ label, value, placeholder, disabled, name }: FieldProps) => {


    const [error, setError] = useState<string | undefined>(undefined);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setInputValue(value?.toString() ?? ''); // Update inputValue when value changes
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const isValidPhoneNumber = (phoneNumber: string): boolean => {
        // Utilizza un'espressione regolare per verificare il formato del numero di telefono
        return /^[+]?[(]?[0-9 ]{3}[)]?[-\s\.]?[0-9 ]{3}[-\s\.]?[0-9 ]{4,6}$/.test(phoneNumber);
    };



    const handleInputBlur = () => {

        if (label === 'Telefono' && !isValidPhoneNumber(inputValue)) {
            setError('Numero di telefono non valido');
            return;
        }
        setError(undefined)
    }



    return (
        <>
            <TextField
                sx={{ mb: 1.5, ml: 1 }}
                id={label}
                label={label}
                name={name}
                variant="standard"
                value={inputValue} // Usa il valore dell'input
                onChange={(e) => handleInputChange(e)}
                onBlur={handleInputBlur}
                error={!!error}
                helperText={error}
                disabled={disabled}
                placeholder={placeholder}
            />
        </>
    );

}

export default PhoneField