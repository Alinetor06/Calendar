import React, { useEffect, useState } from "react";
import { Visita } from '../config/Visite';
import Slider from "./Slider"
import ModalComponent from "./ModalComponent";


//components
import Card from "./Card";


let typeModel: number = 0;

let mod_att: boolean;

const Slideprops = {
    slide_margin: 10,
    zoom_factor: 5,
    max_visible_slides: 5,
    page_transition: 500
};



export const CardShow: React.FC<{}> = ({ }) => {
    const [data, setData] = useState<Visita[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCard, setActiveCard] = useState<Visita>();

    const handleModalOpen = (n: number, attivo?: boolean, visita?: Visita) => {
        setIsModalOpen(true);
        setActiveCard(visita);
        typeModel = n;
        if (typeof attivo === 'boolean') {
            mod_att = attivo;
        }

    };

    const handleModalClose = () => {
        setIsModalOpen(false);
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
            date_visit: new Date('2024-05-12'),
            email: 'adkmvoadvokm@gmail.com',
            tel: '+39323253252'
        },
        {
            id: 3,
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1,
            date_visit: new Date('2024-04-03'),
            email: 'adkmvoadvokm@gmail.com',
            tel: '+39323253252'
        },
        {
            id: 4,
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1,
            date_visit: new Date('2024-02-03'),
            email: 'adkmvoadvokm@gmail.com',
            tel: '+39323253252'
        },
        {
            id: 5,
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1,
            date_visit: new Date('2024-05-01'),
            email: 'adkmvoadvokm@gmail.com',
            tel: '+39323253252'
        },
        {
            id: 6,
            name: 'Mountain view',
            description: '3.98M views',
            priority: 1,
            date_visit: new Date('2024-05-05'),
            email: 'adkmvoadvokm@gmail.com',
            tel: '+39323253252'
        },

    ];

    return (
        <>
            <div className="background-card-container">
                <h2 className='header-text-show'>Visite:</h2>

                <ModalComponent isOpen={isModalOpen} onClose={handleModalClose} activeCard={activeCard} typeModel={typeModel} attivo={mod_att} />

                <>
                    <Slider {...Slideprops}>
                        {dati.map((visita, index) => (
                            <Card key={index} visiteData={[visita]} onOpenModal={handleModalOpen} typo={0} />
                        ))}
                    </Slider>


                </>


            </div>

        </>
    )
}

