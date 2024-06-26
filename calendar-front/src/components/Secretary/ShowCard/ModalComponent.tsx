import React from "react";
import { Modal, Box } from "@mui/material";

//config
import { Visita } from '../../../configuration/Visite';

//components
import Card from "../TypoCard/View_Edit_Cards";
import Card2 from "../TypoCard/Save_Visit_Card"


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

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    activeCard?: Visita,
    typeModel: number,
    attivo?: boolean
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, activeCard, typeModel, attivo }) => {
    let mod_att: boolean = attivo || false;

    let cardComponent;
    if (typeModel === 1) {

        cardComponent = <Card2 />;

        return (
            <Modal onClose={onClose} open={isOpen}>
                <Box sx={style}>
                    {cardComponent}
                </Box>
            </Modal>
        );

    } else if (activeCard && typeModel === 0) {
        console.log("Data is defined and typeModel is 0:", activeCard);
        // Altrimenti, assegna il componente per il formato predefinito della card
        cardComponent = <Card visiteData={[activeCard]} attiva={mod_att} />;

        return (
            <Modal onClose={onClose} open={isOpen}>
                <Box sx={style}>
                    {activeCard && cardComponent}
                </Box>
            </Modal>
        );
    }


};

export default ModalComponent;