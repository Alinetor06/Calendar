import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface StateContextType {
    user: any;
    token: string | null;
    setUser: (user: any) => void;
    setToken: (token: string | null) => void;
}

// Create the context with a default value
const StateContext = createContext<StateContextType>({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
});

// Define the provider's props type
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    );
}


export const useStateContext = () => useContext(StateContext)


