import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized ] = useState(false);

    const login = () => {
        setIsAuthorized(true);
    }

    const logout = () => {
        setIsAuthorized(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthorized, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};