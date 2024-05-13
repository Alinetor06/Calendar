import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box, Button } from '@mui/joy';
import { useState } from 'react';
import GenericField from './GenericField';
import { Visita } from '../../../config/Visite';

const getDateOnly = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const Save_Visit_Card: React.FC = () => {
    const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
    const [newVisit, setNewVisit] = useState<Visita>({
        id: 0,
        name: '',
        email: '',
        priority: 0,
        date_visit: new Date(),
        description: '',
        tel: ''
    });
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

    const handleFieldChange = <T extends keyof Visita>(field: T, value: Visita[T]) => {
        const newVisitCopy = { ...newVisit };
        newVisitCopy[field] = value;
        setNewVisit(newVisitCopy);

        setFieldErrors(prevErrors => ({
            ...prevErrors,
            [field]: undefined
        }));

        setTouchedFields(prevTouched => ({
            ...prevTouched,
            [field]: true
        }));
    };

    const handleSaveNewVisit = () => {
        console.log('Nuova visita salvata:', newVisit);
        setNewVisit({
            id: 0,
            name: '',
            email: '',
            priority: 0,
            date_visit: new Date(),
            description: '',
            tel: ''
        });
        setTouchedFields({});
    };

    // Verifica la validità dei campi e aggiorna gli errori
    React.useEffect(() => {
        const errors: Record<string, string> = {};
        if (touchedFields.name && !newVisit.name.trim()) {
            errors.name = "Il nome è richiesto";
        }
        // Verificare gli altri campi e aggiungere gli errori se necessario

        setFieldErrors(errors);
    }, [newVisit, touchedFields]);

    // Controlla se ci sono errori nei campi toccati
    const hasErrors = Object.values(fieldErrors).some(error => !!error);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ mb: 1.5, ml: 1 }} color="text.secondary">
                    Creazione Visita:
                </Typography>
                <div className='save_visit_Model'>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}>
                        <GenericField
                            label="Nome"
                            value={newVisit.name}
                            onChange={(newValue) => handleFieldChange('name', newValue)}
                            error={fieldErrors['name']}
                        />

                        <GenericField
                            label="Email"
                            value={newVisit.email}
                            onChange={(newValue) => handleFieldChange('email', newValue)}
                            placeholder="es. email@example.com"
                            error={fieldErrors['email']}
                        />

                        <GenericField
                            label="Priorità"
                            value={newVisit.priority}
                            onChange={(newValue) => handleFieldChange('priority', newValue)}
                        />

                        <GenericField
                            label='Data della Visita'
                            value={getDateOnly(newVisit.date_visit)}
                            onChange={(newValue) => handleFieldChange('date_visit', new Date(newValue))}
                            placeholder="es. YYYY-MM-DD"
                            error={fieldErrors['date_visit']}
                        />

                        <GenericField
                            label="Descrizione"
                            value={newVisit.description}
                            onChange={(newValue) => handleFieldChange('description', newValue)}
                        />

                        <GenericField
                            label="Telefono"
                            value={newVisit.tel}
                            onChange={(newValue) => handleFieldChange('tel', newValue)}
                            placeholder="es. +39 0123456789"
                            error={fieldErrors['tel']}
                        />
                    </Box>
                </div>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <Button
                        size="sm"
                        variant="soft"
                        color="success"
                        onClick={handleSaveNewVisit}
                        disabled={hasErrors}
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

export default Save_Visit_Card;