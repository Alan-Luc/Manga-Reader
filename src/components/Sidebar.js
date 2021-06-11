import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CreateIcon from '@material-ui/icons/Create';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Sidebar = (props) => {
  const classes = useStyles();
  const [left, setLeft] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setLeft({ ...left, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem style={{marginLeft: "2.2vw"}}>
          {props.title}
        </ListItem>
        <ListItem button onClick={() => props.setVert(prev => !prev)}>
          <MenuBookIcon style={{ marginRight: '10px'}}/>{!props.vert ? "Vertical mode" : "Horizontal mode"} 
        </ListItem> 
         
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{color: 'white'}}onClick={toggleDrawer(anchor, true)}><ArrowForwardIosIcon style={{color: "#eca1a6"}}/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={left[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Sidebar;