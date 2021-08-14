import React, { useContext, createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Auth = createContext();

const AuthProvider = ({ auth, children }) => {
    const [ userLogged, setUserLogged ] = useState(false);
    const history = useHistory();

    useEffect(() => {
        auth.firebase.onAuthStateChanged((user) => {
            setUserLogged(user);
        });
      }, [auth]);

    const logout = (() => {
        auth.logout()
    });
    const login = (user) => {
        return auth.login(user).then( () => history.push('/dashboard'));
    }
    return (
    <Auth.Provider value={{ logout, login , user: { userLogged, setUserLogged }}}>
        {children}
    </Auth.Provider>
    );
};

const useAuth = () => useContext(Auth);

export { useAuth, AuthProvider };
