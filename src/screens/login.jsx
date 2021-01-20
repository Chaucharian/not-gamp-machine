import React from 'react'
import { useForm } from 'react-hook-form'
import { withStyles } from '@material-ui/styles'
import LoginForm from '../components/loginForm';

const styles = {
    centerContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
}

const Login = (props) => {
    const { classes } = props;
    return (
        <div className={classes.centerContainer}>
            <LoginForm />
        </div>
    )
}

export default withStyles(styles)(Login)