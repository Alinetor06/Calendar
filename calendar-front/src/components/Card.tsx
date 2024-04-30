import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Visita } from '../config/Visite';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

interface CardProps {
    visite: Visita[];
}

const ListStackRatio: React.FC<CardProps> = ({ visite }) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            {visite.map((v, index) => (
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
                </React.Fragment>
            ))}
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Button
                    size="sm"
                    variant="soft"
                    color="primary"
                >
                    Visualizza
                </Button>

                <Button
                    size="sm"
                    variant="soft"
                    color="warning"
                >
                    Modifica
                </Button>

                <Button
                    size="sm"
                    variant="soft"
                    color="danger"
                >
                    Elimina
                </Button>

            </Box>
        </Card>
    );
}

export default ListStackRatio;
