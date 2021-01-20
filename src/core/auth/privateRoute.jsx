import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from './authService';

export const PrivateRoute = ({
    component: Component,
    redirectPath = '/login',
    ...rest
}) => {
    const [userLogged, setUserLogged] = useState(false);
    const firebase = new AuthService();

    useEffect(() => {
        firebase.auth.onAuthStateChanged((user) => {
          if (user) {
            setUserLogged(true);
          } else {
            setUserLogged(false);
          }
        });
      }, [firebase]);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                userLogged ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: redirectPath,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}
