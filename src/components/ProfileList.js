import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { extractUId } from '../utils/token';
import { getCurrentMode } from '../theme';

function ProfileList() {
  const uid = extractUId(React.useContext(AuthContext));
  const currentMode = getCurrentMode();
  return (
      <List>
        <ListItem button key={'profile'} style={{ color: currentMode === "dark" ? "white" : "black" }} component={Link} to={`/profile/${uid}`}>
          <ListItemIcon style={{ color: currentMode === "dark" ? "white" : "black" }}>
            <AccountCircle/>
          </ListItemIcon>
          <ListItemText primary="Profile" style={{ color: currentMode === "dark" ? "white" : "black" }}/>
        </ListItem>
      </List>
  );
}

export default ProfileList;
