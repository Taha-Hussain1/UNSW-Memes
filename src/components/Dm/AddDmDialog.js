import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import React from 'react';
import AuthContext from '../../AuthContext';
import { makeRequest } from '../../utils/axios_wrapper';
import { extractUId } from '../../utils/token';
import { getCurrentMode } from '../../theme';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const currentMode = getCurrentMode();
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddDmDialog({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const token = React.useContext(AuthContext);
  const uId = extractUId(token);

  React.useEffect(() => {
    function fetchUserData() {
      makeRequest('GET', 'USERS_ALL', { token })
          .then(({ data }) => {
            setUsers(data['users']);
          })
          .catch(err => console.log(err));
    }
    fetchUserData();
  }, [token]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleUserSelect(event) {
    setSelectedUsers(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    makeRequest('POST', 'DM_CREATE', { token, uIds: selectedUsers })
        .then(response => {
          console.log(response);
          props.callback();
        })
        .catch(err => console.log(err));
  }
  return (
      <div>
        <IconButton size="small" style={{ color: currentMode === "dark" ? "white" : "black" }} onClick={handleClickOpen}>
          <Add/>
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" style={{ color: currentMode === "dark" ? "white" : "black" }}>Create Dm</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText style={{ color: currentMode === "dark" ? "white" : "black" }}>Select the users below to create a new dm</DialogContentText>
              <Select
                  multiple
                  value={selectedUsers}
                  onChange={handleUserSelect}
                  input={<Input/>}
                  MenuProps={MenuProps}
                  style={{ width: '100%', color: currentMode === "dark" ? "white" : "black" }}
              >
                {users.map(d => {
                  if (uId != d.uId) {
                    return (
                        <MenuItem key={d.uId} style={{ color: currentMode === "dark" ? "white" : "black" }} value={d.uId}>
                          {d.nameFirst + ' ' + d.nameLast}
                        </MenuItem>
                    );
                  }
                })}
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} type="submit" color="primary">Create</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
  );
}

export default AddDmDialog;
