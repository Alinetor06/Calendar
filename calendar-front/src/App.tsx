import React, { useState } from 'react';
import './css/App.css';
import SignIn from './components/Login_Register/Login'
import SearchSecretary from './components/Secretary/SerchSecretary';
import CalendarSecretary from './components/Secretary/Calendar/CalendarSecretary';
import Home from './components/Home/Home';
import Navbar from './components/NavBar/NavBar';
import SignUp from './components/Login_Register/Registrazione';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [authenticated, setAuthenticated] = useState(false); // Sposta la chiamata di useState qui


  return (
    <div className='App'>
      <Router>
        <Navbar auth={authenticated} setAuth={setAuthenticated} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SignIn' element={<SignIn setAuthenticated={setAuthenticated} />} />
          {authenticated && (
            <>
              <Route path='/CalendarSecretary' element={<CalendarSecretary />} />
              <Route path='/SearchSecretary' element={<SearchSecretary />} />
            </>
          )}
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
