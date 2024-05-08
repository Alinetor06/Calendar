import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";

//config
import { Visita } from '../config/Visite';

//components
import Card from "./Card";

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
    return (
        <Modal onClose={onClose} open={isOpen}>
            <Box sx={style}>
                {activeCard && (
                    <Card visiteData={[activeCard]} onOpenModal={() => { }} typo={typeModel} attiva={mod_att} />
                )}
            </Box>
        </Modal>
    );
};

export default ModalComponent;