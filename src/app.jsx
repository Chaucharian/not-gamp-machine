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
        <AuthProvider auth={new AuthService()}>
            <ViewLoader>
                <Router basename="/not-gamp-machine" >
                    <Switch>
                        <PrivateRoute path='/dashboard' component={Dashboard} />
                        <Route path='/login' component={Login} />
                        <Redirect to="/login" />
                    </Switch>
                </Router>
            </ViewLoader>
        </AuthProvider>
    );
}

export default App;