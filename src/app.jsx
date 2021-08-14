import "@babel/polyfill";
import React from 'react';
import {   BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './core/auth/privateRoute';
import { AuthProvider } from './core/auth/context';
import Dashboard from './screens/dashboard';
import Login from './screens/login';
import AuthService from './core/auth/authService';
import ViewLoader from './components/viewLoader';

const App = () => {

    return (
        <Router basename="/" >
            <AuthProvider auth={new AuthService()}>
                <Switch>
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <Route path='/login' component={Login} />
                    <Redirect to="/login" />
                    </Switch>
                </AuthProvider>
        </Router>
    );
}

export default App;