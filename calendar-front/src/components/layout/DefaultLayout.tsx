import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
import { useEffect } from "react";

interface User {
    name: string;
    // Aggiungi altri campi necessari per l'utente
}

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    console.log(user)

    if (!token) {
        return <Navigate to="/Login" />;
    }

    const onLogout = async (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        try {
            await axiosClient.post('/logout');
            setUser({});
            setToken(null);
        } catch (error) {
            console.error("Errore durante il logout", error);
            alert("Errore durante il logout. Per favore riprova.");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axiosClient.get('/user');
                setUser(data as User);
            } catch (error) {
                console.error("Errore durante il recupero dei dati dell'utente", error);
                alert("Errore durante il recupero dei dati. Per favore riprova.");
            }
        };
        fetchUser();
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/CalendarSecretary">Calendario</Link>
                <Link to="/SearchSecretary">Ricerca Visite</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user && user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
