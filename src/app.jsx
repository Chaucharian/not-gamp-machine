import "@babel/polyfill";
import React from 'react';
import {   BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './core/auth/privateRoute';
import { AuthProvider } from './core/auth/context';
import Dashboard from './screens/dashboard';
import Login from './screens/login';
import AuthService from './core/auth/authService';

const App = () => {

    return (
        <AuthProvider auth={new AuthService()}>
            <Router>
                <Switch>
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <Route path='/login' component={Login} />
                    <Redirect to="/login" />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;