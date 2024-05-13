import { Calendar } from './Calendar/Calendar'
import { CardSlider } from './ShowCard/ShowSlideCard'


const CalendarSecretary: React.FC<{}> = () => {

    return (
        <div className="background-container">
            <h1 className='header-text-calendar'>Calendario delle Visite </h1>
            <Calendar />
            <CardSlider />
        </div>
    );
}

export default CalendarSecretary