import './css/App.css';
import { DataPicker } from './components/Calendar/DataPicker'
import { CardSlider } from './components/ShowSlideCard'





function App() {
  return (
    <div className='App'>
      <div className="background-container">
        <DataPicker />
        <CardSlider />
      </div>
    </div>
  );
}

export default App