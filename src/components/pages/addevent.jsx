import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

function AddEvent({ open, onClose }) {
  const [eventData, setEventData] = useState({
    event: '',
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8080/util/event', eventData)
      .then(response => {
        console.log(response.data);
        onClose();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="event"
          label="Event"
          type="text"
          fullWidth
          value={eventData.event}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={eventData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="date"
          label="Date"
          type="datetime-local"
          fullWidth
          value={eventData.date}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEvent;
