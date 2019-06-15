import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import WavesIcon from '@material-ui/icons/Waves';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { brotliDecompress } from 'zlib';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    fontSize:,
    fontWeight : '800 !important',
    backgroundColor: theme.palette.grey,
  }
}));

function DisplayData(props) {
  const classes = useStyles();

  const {temperature,humedity}=props;
  return (
    <List className={classes.root}>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <BrightnessMediumIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Temperature" secondary={temperature} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WavesIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Humedity" secondary={humedity} />
      </ListItem>
    </List>
  );
}

export default DisplayData;
