import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import SetUserPermissionsDialog from './SetUserPermissionsDialog';
import UserRemoveDialog from './UserRemoveDialog';
import { getCurrentMode } from '../../theme';

export default function Admin() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef();
  const currentMode = getCurrentMode();
  const handleClick = event => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <div>
        <Button
            ref={buttonRef}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
        >
          Admin
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={buttonRef.current}
            keepMounted
            open={open}
            onClose={handleClose}
        >
          <SetUserPermissionsDialog>
            <MenuItem style={{ color: currentMode === "dark" ? "white" : "black" }} onClick={handleClose}>Set User Permissions</MenuItem>
          </SetUserPermissionsDialog>
          <UserRemoveDialog>
            <MenuItem style={{ color: currentMode === "dark" ? "white" : "black" }} onClick={handleClose}>Remove Users</MenuItem>
          </UserRemoveDialog>
          <MenuItem style={{ color: currentMode === "dark" ? "white" : "black" }} onClick={handleClose}>Close</MenuItem>
        </Menu>
      </div>
  );
}
