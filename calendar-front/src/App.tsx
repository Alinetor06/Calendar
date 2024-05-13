// Importa i componenti necessari da react-router-dom
import './css/App.css';
import SignIn from './components/Login_Register/Login'
import Secretary from './components/Secretary';
import Home from './components/Home/Home';
import Navbar from './components/NavBar/NavBar';
import SignUp from './components/Login_Register/Registrazione';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar /> {/* Includi il componente Navbar */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/CalendarSecretary' element={<Secretary />} />
          <Route path='/SerchSecretary' element={<Secretary />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
