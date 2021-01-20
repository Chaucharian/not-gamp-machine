import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { withStyles } from '@material-ui/styles'
import WhiteTextField from './whiteTextField'
import ReflectButton from './reflectButton'

const styles = {
    centerContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    contentContainer: {
        padding: '10px',
        maxWidth: '450px',
        width: '100%',
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        paddingRight: '10px',
        marginBottom: '10px',
        '& button': {
            marginTop: '60px',
        },
    },
    fieldError: {
        '& label': {
            color: 'red !important',
        },
        '& div:before': {
            borderBottomColor: 'red !important',
        },
    },
    buttonContainer: {
        display: 'block',
        width: '100px',
        margin: '0px auto',
        marginTop: '50px',
        '& label': {
            fontFamily: 'Alegreya Sans SC',
            fontSize: '20px',
            '&:hover': {
                paddingTop: '10px',
            },
        },
    },
    spinnerContainer: {
        paddingTop: '15px',
    },
    nextPageButton: {
        color: '#FFF',
        fontSize: '40px',
        border: 'none',
        outline: '0px',
        background: 'transparent',
        transition: '1s all ease-in-out',

        '&:hover': {
            color: '#000',
        },
    },
}

const LogInForm = (props) => {
    const {
        classes,
        formErrors,
        fetching,
        showModal,
        onModalClose,
        onSubmit,
        onChangePage,
    } = props
    const { register, handleSubmit, setError, errors } = useForm();

    return (
        <div className={classes.centerContainer}>
            <div className={classes.contentContainer}>
                <div className={classes.formContainer}>
                    <form
                        className={classes.formContainer}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <WhiteTextField
                            inputRef={register({
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                },
                            })}
                            classes={{
                                root: errors.email ? classes.fieldError : '',
                            }}
                            label="Email"
                            name="email"
                            margin="normal"
                            type="email"
                        />
                        <WhiteTextField
                            inputRef={register({
                                required: true,
                                pattern: {
                                    value: /(?=.{6,})/,
                                },
                            })}
                            classes={{
                                root: errors.password ? classes.fieldError : '',
                            }}
                            name="password"
                            label="Contraseña"
                            margin="normal"
                            type="password"
                        />
                        <ReflectButton
                            text="Iniciar Sesion"
                            icon={<i className="fa fa-instagram"></i>}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(LogInForm)