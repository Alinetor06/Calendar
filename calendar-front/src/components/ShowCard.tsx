import React, { useEffect, useState } from "react";
import { Visita } from '../config/Visite';
import Slider from "./Slider"
import { Modal, Box } from "@mui/material";

//components
import Card from "./Card";

let typeModel: number = 0;

const Slideprops = {
    slideMargin: 10,
    zoomFactor: 5,
    maxVisibleSlides: 5,
    pageTransition: 500
};

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



export const CardShow: React.FC = () => {
    const [data, setData] = useState<Visita[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeCard, setActiveCard] = useState<Visita>();

    const handleDialogOpen = (visita: Visita, n: boolean) => {
        setIsDialogOpen(true);
        setActiveCard(visita);
        if (n === false) {
            typeModel = 1;
        } else {
            typeModel = 2;
        }
    };


    const handleDialogClose = () => {
        setIsDialogOpen(false);
    }



    /**useEffect(() => {
        const getData = async () => {
            const data = await (
                await fetch('')
            ).json();
            setData(data);
        };
        getData();
    }, []) */

    const dati: Visita[] = [
        {
            id: 1,
            name: 'Night view',
            description: '4.21M views',
            priority: 1,
            date_visit: new Date('2024-05-30'),
            email: 'adkmvoadvokm@gmail.com',
            tel: '+39323253252'

        },
        {
            id: 2,
            name: 'Lake view',
            description: '4.74M views',
            priority: 1,
            date_visit: new Date('2024-05-12')
        },
        {
            id: 3,
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1,
            date_visit: new Date('2024-04-03')
        },
        {
            id: 4,
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1,
            date_visit: new Date('2024-02-03')
        },
        {
            id: 5,
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1,
            date_visit: new Date('2024-05-01')
        },
        {
            id: 6,
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1,
            date_visit: new Date('2024-05-05')
        },

    ];

    return (
        <>
            <div className="background-card-container">
                <h2 className='header-text-show'>Visite:</h2>


                <Modal onClose={handleDialogClose} open={isDialogOpen} >
                    <Box sx={style}>
                        {activeCard && (

                            <Card visite={[activeCard]} onOpenModal={handleDialogOpen} typo={typeModel} />
                        )}
                    </Box>
                </Modal>

                <Slider {...Slideprops}>
                    {dati.map((visita, index) => (
                        <Card key={index} visite={[visita]} onOpenModal={handleDialogOpen} typo={0} />
                    ))}
                </Slider>


            </div>

        </>
    )
}

