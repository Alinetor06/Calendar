import React, { useState } from "react";
import { Visita } from '../../../config/Visite';
import Slider from "../Slider"
import ModalComponent from "./ModalComponent";



//components
import VisitCard from "../TypoCard/Slider_Card";


let typeModel: number = 0;

let mod_att: boolean;

const Slideprops = {
    slide_margin: 10,
    zoom_factor: 5,
    max_visible_slides: 5,
    page_transition: 500
};

interface CardSilderProps {
    data: Visita[]
}


export const CardSlider: React.FC<CardSilderProps> = ({ data }) => {


    const today = new Date();
    // const [data, setData] = useState<Visita[]>([]);
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


    return (
        <>
            <div className="background-card-container">
                <h2 className='header-text-show'>Visite:</h2>

                <ModalComponent isOpen={isModalOpen} onClose={handleModalClose} activeCard={activeCard} typeModel={0} attivo={mod_att} />

                <>
                    <Slider {...Slideprops}>
                        {data.map((visita, index) => (
                            <VisitCard key={index} visit={visita} onOpenModal={handleModalOpen} isPastDate={visita.date_visit < today} />
                        ))}
                    </Slider>


                </>


            </div>

        </>
    )
}

