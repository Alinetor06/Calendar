import { Calendar } from './Secretary/Calendar/Calendar'
import { CardSlider } from './Secretary/ShowSlideCard'
import Search_Visit_Card from './Secretary/TypoCard/SearchCard';


const Secretary: React.FC<{}> = () => {

    return (
        <div className="background-container">
            <h1 className='header-text-calendar'>Calendar </h1>
            <div className='serch-container'>
                <Calendar />
                <Search_Visit_Card />
            </div>
            <CardSlider />
        </div>
    );
}

export default Secretary