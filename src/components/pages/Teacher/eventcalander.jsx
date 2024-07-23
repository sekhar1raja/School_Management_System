import React, { Component } from 'react';
import axios from 'axios';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, TextField } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import CustomToolbar from "../customtoolbar";

const localizer = momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      openSlot: false,
      openEvent: false,
      start: new Date(),
      end: new Date(),
      title: '',
      desc: '',
      clickedEvent: null,
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    axios.get('http://localhost:8080/util/event')
      .then(response => {
        console.log('Fetched events:', response.data);

        const events = response.data.map(event => {
          // Adjust the date parsing based on your backend's date format
          const startDate = moment(event.date, 'YYYY-MM-DDTHH:mm:ssZ').toDate();
          return {
            id: event.id,
            title: event.event || 'No Title',
            start: isNaN(startDate.getTime()) ? new Date() : startDate,
            end: isNaN(startDate.getTime()) ? new Date() : startDate,
            desc: event.description || 'No Description',
          };
        });

        console.log('Mapped events:', events);
        this.setState({ events });
      })
      .catch(err => console.error('Error fetching events:', err));
  }

  handleSlotSelected = (slotInfo) => {
    this.setState({
      title: "",
      desc: "",
      openSlot: true,
      start: slotInfo.start,
      end: slotInfo.end,
    });
  }

  handleEventSelected = (event) => {
    this.setState({
      openEvent: true,
      start: new Date(event.start),
      end: new Date(event.end),
      title: event.title,
      desc: event.desc,
      clickedEvent: event,
    });
  }

  handleClose = () => {
    this.setState({
      openSlot: false,
      openEvent: false,
      title: '',
      desc: '',
      start: new Date(),
      end: new Date(),
    });
  }

  setTitle = (e) => {
    this.setState({ title: e });
  }

  setDescription = (e) => {
    this.setState({ desc: e });
  }

  handleStartTime = (date) => {
    this.setState({ start: date });
  }

  handleEndTime = (date) => {
    this.setState({ end: date });
  }

  setNewAppointment = () => {
    const { start, end, title, desc } = this.state;
    const newEvent = {
      event: title,
      description: desc,
      date: moment(start).format('YYYY-MM-DDTHH:mm:ssZ'), // Adjust format if needed
    };

    axios.post('http://localhost:8080/util/event', newEvent)
      .then(() => {
        this.fetchEvents();
      })
      .catch(err => console.error('Error adding event:', err));
  }

  updateEvent = () => {
    const { title, desc, start, end, clickedEvent } = this.state;
    const updatedEvent = {
      id: clickedEvent.id,
      event: title,
      description: desc,
      date: moment(start).format('YYYY-MM-DDTHH:mm:ssZ'), // Adjust format if needed
    };

    axios.put('http://localhost:8080/util/event', updatedEvent)
      .then(() => {
        this.fetchEvents();
      })
      .catch(err => console.error('Error updating event:', err));
  }

  deleteEvent = () => {
    const { clickedEvent } = this.state;

    axios.delete(`http://localhost:8080/util/event?id=${clickedEvent.id}`)
      .then(() => {
        this.fetchEvents();
      })
      .catch(err => console.error('Error deleting event:', err));
  }

  render() {
    const eventActions = [
      <Button key="cancel" variant="contained" color="primary" onClick={this.handleClose}>Cancel</Button>,
      <Button key="delete" variant="contained" color="secondary" onClick={() => { this.deleteEvent(); this.handleClose(); }}>Delete</Button>,
      <Button key="confirm" variant="contained" color="primary" onClick={() => { this.updateEvent(); this.handleClose(); }}>Confirm Edit</Button>,
    ];

    const appointmentActions = [
      <Button key="cancel" variant="contained" color="secondary" onClick={this.handleClose}>Cancel</Button>,
      <Button key="submit" variant="contained" color="primary" onClick={() => { this.setNewAppointment(); this.handleClose(); }}>Submit</Button>,
    ];

    return (
      <div className="flex-container">  
        <div className="calendar-container" style={{ width: '100%' }}>
          <BigCalendar
            localizer={localizer}
            events={this.state.events}
            views={['month', 'week', 'day', 'agenda']}
            timeslots={2}
            defaultView="month"
            defaultDate={new Date()}
            selectable={true}
            onSelectEvent={event => this.handleEventSelected(event)}
            onSelectSlot={slotInfo => this.handleSlotSelected(slotInfo)}
            components={{ toolbar: CustomToolbar }}
          />

          <Dialog open={this.state.openSlot} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <div className="dialog-content">
              <h2>Add an Event {moment(this.state.start).format('MMMM Do YYYY')}</h2>
              <TextField label="Title" onChange={e => this.setTitle(e.target.value)} fullWidth margin="normal" />
              <TextField label="Description" onChange={e => this.setDescription(e.target.value)} fullWidth margin="normal" multiline />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker label="Start Time" value={this.state.start} onChange={this.handleStartTime} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
                <TimePicker label="End Time" value={this.state.end} onChange={this.handleEndTime} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
              </LocalizationProvider>
              <div className="dialog-actions">{appointmentActions}</div>
            </div>
          </Dialog>

          <Dialog open={this.state.openEvent} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <div className="dialog-content">
              <h2>View/Edit Appointment of {moment(this.state.start).format('MMMM Do YYYY')}</h2>
              <TextField label="Title" defaultValue={this.state.title} onChange={e => this.setTitle(e.target.value)} fullWidth margin="normal" />
              <TextField label="Description" defaultValue={this.state.desc} onChange={e => this.setDescription(e.target.value)} fullWidth margin="normal" multiline />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker label="Start Time" value={this.state.start} onChange={this.handleStartTime} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
                <TimePicker label="End Time" value={this.state.end} onChange={this.handleEndTime} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
              </LocalizationProvider>
              <div className="dialog-actions">{eventActions}</div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default Calendar;
