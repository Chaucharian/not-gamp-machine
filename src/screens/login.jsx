import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/styles'
import LoginForm from '../components/loginForm';
import { useAuth } from '../core/auth/context';

const styles = {
    centerContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
}

const Login = (props) => {
    const { classes } = props;
    const { login, user: { userLogged }  } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if(userLogged) {
            history.push('/dashboard');
        }
      }, [userLogged]);

      return (
        <div className={classes.centerContainer}>
            <LoginForm onSubmit={login}/>
        </div>
    )
}

export default withStyles(styles)(Login)