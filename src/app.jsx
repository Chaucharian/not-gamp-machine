import "@babel/polyfill";
import React from 'react';
import {   BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './core/auth/privateRoute';
import Dashboard from './screens/dashboard';
import Login from './screens/login';

const App = () => {

    return (
        <Router>
            <Switch>
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <Route path='/login' component={Login} />
                <Redirect to="/login" />
            </Switch>
        </Router>
    );
}

export default App;