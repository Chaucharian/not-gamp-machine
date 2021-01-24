import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import WavesIcon from '@material-ui/icons/Waves';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: 360,
    fontWeight : '800 !important',
    backgroundColor: theme.palette.grey,
    "& p": {
      color: "#FFF"
    }
  },
}));

function DisplayData(props) {
  const classes = useStyles();

  const {temperature,humedity}=props;
  return (
    <Box display="flex" justifyContent="center" >
       <List className={classes.root}>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <BrightnessMediumIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Temperature" secondary={`${temperature}º`} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WavesIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Humidity" secondary={`${humedity}%`} />
      </ListItem>
    </List>
    </Box>
  );
}

export default DisplayData;
