import './css/App.css';
import { DataPicker } from './components/DataPicker'
import { CardShow } from './components/ShowCard'



function App() {
  return (
    <div className='App'>
      <DataPicker />
      <CardShow />
    </div>
  );
}

export default App