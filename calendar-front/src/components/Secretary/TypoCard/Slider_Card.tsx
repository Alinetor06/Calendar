import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box, Button } from '@mui/joy';
import { Visita } from '../../../configuration/Visite';
import axiosClient from '../../../axios-client';

// Specifica il tipo di 'visit' usando l'interfaccia definita
const VisitCard: React.FC<{ visit: Visita, onOpenModal: (n: number, attiva?: boolean, visita?: Visita) => void, isPastDate: boolean }> = ({ visit, onOpenModal, isPastDate }) => {

    const onDeleteClick = (visit: Visita) => {
        if (!window.confirm("Sei sicuro di voler eliminare questa visita?")) {
            return;
        }
        axiosClient.delete(`/visits/${visit.id}`)
            .then(response => {
                console.log('Visita eliminata:', response.data);
                // Puoi aggiungere ulteriori azioni qui, ad esempio un aggiornamento della lista delle visite
            })
            .catch(error => {
                console.error('Errore durante l\'eliminazione della visita:', error);
            });
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {visit.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {visit.description}
                </Typography>
                <Typography variant="h5" component="div">
                    {visit.priority}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Button id='ButtonView' size="sm" variant="soft" color="primary" onClick={() => onOpenModal(0, false, visit)}>
                    Visualizza
                </Button>
                <Button id='ButtonEdit' size="sm" variant="soft" color="warning" disabled={isPastDate} onClick={() => onOpenModal(0, true, visit)}>
                    Modifica
                </Button>
                <Button id='ButtonDelete' size="sm" variant="soft" color="danger" disabled={isPastDate} onClick={() => onDeleteClick(visit)}>
                    Elimina
                </Button>
            </Box>
        </Card>
    );
};

export default VisitCard;
