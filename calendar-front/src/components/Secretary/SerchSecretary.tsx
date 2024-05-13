import { CardSlider } from './ShowCard/ShowSlideCard'
import Search_Visit_Card from './TypoCard/SearchCard';


const SearchSecretary: React.FC<{}> = () => {

    return (
        <div className="background-container">
            <h1 className='header-text-calendar'>Cerca Visite </h1>
            <div className='serch-container'>
                <Search_Visit_Card />
            </div>
            <CardSlider />
        </div>
    );
}

export default SearchSecretary