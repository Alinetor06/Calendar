import './css/App.css';
import { DataPicker } from './components/Calendar/DataPicker'
import { CardShow } from './components/ShowCard'





function App() {
  return (
    <div className='App'>
      <div className="background-container">
        <DataPicker />
        <CardShow />
      </div>
    </div>
  );
}

export default App