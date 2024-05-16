import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'


interface NavbarProps {
    auth: boolean
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<NavbarProps> = ({ auth, setAuth }) => {

    const handleLogout = () => {
        // Aggiungi qui la logica per eseguire il logout
        setAuth(false); // Imposta lo stato di login su false
        // Esegui altre azioni necessarie per il logout, come cancellare i dati dell'utente dalla sessione, ecc.
    };



    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {!auth ? (
                        <Link to="/SignIn">Sign In</Link>
                    ) : (
                        <Link to="/CalendarSecretary">Calendario</Link>
                    )}
                </li>
                {auth && (
                    <React.Fragment>
                        <li>
                            <Link to="/SearchSecretary">Cerca Visita</Link>

                        </li>
                        <li>
                            <Link onClick={handleLogout} to="/">LogOut</Link>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
