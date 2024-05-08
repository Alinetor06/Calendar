import React from "react";
import { Modal, Box } from "@mui/material";

//config
import { Visita } from '../config/Visite';

//components
import Card from "./TypoCard/View_Edit_Save_Cards";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalComponent: React.FC<{ isOpen: boolean, onClose: () => void, activeCard?: Visita, typeModel: number, attivo?: boolean }> = ({ isOpen, onClose, activeCard, typeModel, attivo }) => {
    let mod_att: boolean = attivo || false;

    let cardComponent;
    if (activeCard && typeModel === 2) {
        cardComponent = <Card visiteData={[activeCard]} typo={typeModel} />;

    } else if (activeCard) {
        // Altrimenti, assegna il componente per il formato predefinito della card
        cardComponent = <Card visiteData={[activeCard]} typo={typeModel} attiva={mod_att} />;
    }

    return (
        <Modal onClose={onClose} open={isOpen}>
            <Box sx={style}>
                {activeCard && cardComponent}
            </Box>
        </Modal>
    );
};

export default ModalComponent;