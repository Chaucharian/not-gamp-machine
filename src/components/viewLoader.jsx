import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {useAuth } from '../core/auth/context';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    background: "#cccccc4d",
    "&:after": {
            content: "''",
            display: "block",
            position: "absolute",
            top: "0",
            width: "100%",
            height: "100%",
            transform: "translateX(-100px)",
            background: "linear-gradient(90deg,transparent,rgba(255, 255, 255, 0.2),transparent)",
            animation: "loading 0.8s infinite"
        },
    },
   
}
));



const ViewLoader = ({ children }) => {
   const classes = useStyles();
   const { user: { userLogged }  } = useAuth();

  return (
    !userLogged ? 
    <div className={classes.root} ></div> :
    { ...children }
  );
};

export default ViewLoader;