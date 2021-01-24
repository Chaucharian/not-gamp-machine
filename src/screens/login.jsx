import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { withStyles } from '@material-ui/styles'
import LoginForm from '../components/loginForm';
import {useAuth } from '../core/auth/context';

const styles = {
    centerContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
}

const Login = (props) => {
    const { classes } = props;
    // const [loading, setLoading] = useState(true);
    const { auth, user: { userLogged }  } = useAuth();
    const history = useHistory();
    const location = useLocation();

    const login = (user) => {
        auth.login(user).then( () => history.push('/dashboard'));
    }

    useEffect(() => {
        if(userLogged) {
            history.push('/dashboard');
        }
      }, [userLogged]);

      return (
        <div className={classes.centerContainer}>
            <LoginForm onSubmit={login} />
        </div>
    )
}

export default withStyles(styles)(Login)