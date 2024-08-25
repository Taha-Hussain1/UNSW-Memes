import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { KeyboardTimePicker } from '@material-ui/pickers';
import React from 'react';
import { getCurrentMode } from '../../theme';

function AddMessageTimerDialog({ open, handleClose, onTimerChange, ...props }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const currentMode = getCurrentMode();
  function handleSubmit(event) {
    event.preventDefault();
    onTimerChange(selectedDate);
  }
  
  return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Send later</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={selectedDate}
                  onChange={d => setSelectedDate(d.toDate())}
                  KeyboardButtonProps={{
                    style: { color: currentMode === "dark" ? "white" : "black" },
                    'aria-label': 'change time',
                  }}
                  InputProps={{
                    style: { color: currentMode === "dark" ? "white" : "black" },
                  }}
                  InputLabelProps={{
                    style: { color: currentMode === "dark" ? "white" : "black" },
                  }}
              />
              <DialogContentText style={{ color: currentMode === "dark" ? "white" : "black" }}>Enter a time to send</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} type="submit" color="primary">Set Time</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
  );
}

export default AddMessageTimerDialog;
