import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import GuestLayout from "./components/layout/GuestLayout";
import Login from "./pages/Login_Register/Login";
import Registrazione from "./pages/Login_Register/Registrazione";
import CalendarSecretary from "./pages/CalendarSecretary";
import NotFound from "./pages/NotFound";
import SearchSecretary from "./pages/SerchSecretary";
import './App.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/CalendarSecretary',
                element: <CalendarSecretary />
            },
            {
                path: '/SearchSecretary',
                element: <SearchSecretary />
            }
        ]


    },

    {
        path: '/',
        element: <GuestLayout />,

        children: [
            {
                path: '/Login',
                element: <Login />
            },
            {
                path: '/SignUp',
                element: <Registrazione />
            }
        ]
    },

    {
        path: '*',
        element: <NotFound />
    }



])

export default router
