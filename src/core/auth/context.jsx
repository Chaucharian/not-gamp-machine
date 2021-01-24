import React, { useContext, createContext, useState, useEffect } from 'react';
import AuthService from './authService';

const Auth = createContext();

const AuthProvider = ({ auth, children }) => {
    const [ userLogged, setUserLogged ] = useState(false);

    useEffect(() => {
        auth.firebase.onAuthStateChanged((user) => {
            setUserLogged(true);
        });
      }, [auth]);

    return (
    <Auth.Provider value={  { auth, user: { userLogged, setUserLogged } } }>
        {children}
    </Auth.Provider>
    );
};

const useAuth = () => useContext(Auth);

export { useAuth, AuthProvider };
