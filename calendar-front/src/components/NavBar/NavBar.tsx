// Navbar.tsx
// Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar: React.FC<{}> = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleLogout = () => {
        // Aggiungi qui la logica per eseguire il logout
        setIsLogin(false); // Imposta lo stato di login su false
        // Esegui altre azioni necessarie per il logout, come cancellare i dati dell'utente dalla sessione, ecc.
    };

    const handleToggleEdit = () => {
        setIsLogin(true);
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {!isLogin ? (
                        <Link to="/SignIn">Sign In</Link>
                    ) : (
                        <Link to="/CalendarSecretary">Calendario</Link>
                    )}
                </li>
                {isLogin && (
                    <React.Fragment>
                        <li>
                            <Link to="/SearchSecretary">Cerca Visita</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>LogOut</button>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
