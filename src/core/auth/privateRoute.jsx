import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './context';

export const PrivateRoute = ({
    component: Component,
    redirectPath = '/login',
    ...rest
}) => {
    const { user: { userLogged } } = useAuth();

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
