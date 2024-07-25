import React, { Component } from 'react';
import axios from 'axios';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, TextField, Typography, Box, Grid, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventIcon from '@mui/icons-material/Event';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported


const localizer = momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      upcomingEvents: [],
      openSlot: false,
      openEvent: false,
      start: new Date(),
      end: new Date(),
      title: '',
      desc: '',
      clickedEvent: null,
      selectedUpcomingEvent: '',
      selectedUpcomingEventDetails: null,
      anchorEl: null, // For the dropdown menu
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
          const startDate = moment(event.date, 'YYYY-MM-DDTHH:mm:ssZ').toDate();
          const endDate = moment(event.date, 'YYYY-MM-DDTHH:mm:ssZ').add(1, 'hour').toDate(); // Assuming events are 1-hour long
          return {
            id: event.id,
            title: event.event || 'No Title',
            start: isNaN(startDate.getTime()) ? new Date() : startDate,
            end: isNaN(endDate.getTime()) ? new Date() : endDate,
            desc: event.description || 'No Description',
            color: this.getRandomColor(), // Add random color
          };
        });

        console.log('Mapped events:', events);
        this.setState({ events, upcomingEvents: events.slice(0, 5) }); // Show the first 5 upcoming events
      })
      .catch(err => console.error('Error fetching events:', err));
  }

  getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A2', '#33FFF7'];
    return colors[Math.floor(Math.random() * colors.length)];
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
      anchorEl: null, // Close the dropdown menu
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
      date: moment(start).format('YYYY-MM-DDTHH:mm:ssZ'),
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
      date: moment(start).format('YYYY-MM-DDTHH:mm:ssZ'),
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

  handleUpcomingEventChange = (event) => {
    const selectedEventId = event.currentTarget.value;
    const selectedEvent = this.state.upcomingEvents.find(ev => ev.id === selectedEventId);
    this.setState({ 
      selectedUpcomingEvent: selectedEventId,
      selectedUpcomingEventDetails: selectedEvent || null,
      anchorEl: event.currentTarget // Set the anchor element for the dropdown
    });
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
      <Box p={3}>
        <Typography variant="h4" gutterBottom>Event Calendar</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
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
              // components={{ toolbar: CustomToolbar }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color,
                },
              })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb={2}>
              {/* <Typography variant="h5" gutterBottom>Upcoming Events</Typography> */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{this.state.selectedUpcomingEventDetails ? this.state.selectedUpcomingEventDetails.title : 'Upcoming Events'}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {this.state.upcomingEvents.map(event => (
                      <ListItem 
                        button 
                        key={event.id}
                        onClick={() => this.handleUpcomingEventChange({ currentTarget: { value: event.id }})}
                      >
                        <ListItemIcon>
                          <EventIcon />
                        </ListItemIcon>
                        <div className='flex flex-row'>
                          <div className='card-title p-1 bg-info bg-opacity-10 border border-info border-start-0 rounded-end'>
                          <ListItemText primary={event.title} />
                          </div>
                          <div className='card-text'>
                          <ListItemText primary={event.desc} />
                          </div>
                        </div>
                      
                      </ListItem>
                    ))}
                  </List>
                
                </AccordionDetails>
              </Accordion>
              {/* {this.state.selectedUpcomingEventDetails && (
                <Card style={{ marginTop: '10px' }}>
                  <CardContent>
                    <Typography variant="h6">{this.state.selectedUpcomingEventDetails.title}</Typography>
                    <Typography variant="body2">{this.state.selectedUpcomingEventDetails.desc}</Typography>
                  </CardContent>
                </Card>
              )} */}
            </Box>
          </Grid>
        </Grid>

        <Dialog open={this.state.openSlot} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <div className="dialog-content">
            <Typography variant="h6">Add an Event {moment(this.state.start).format('MMMM Do YYYY')}</Typography>
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
            <Typography variant="h6">View/Edit Event {moment(this.state.start).format('MMMM Do YYYY')}</Typography>
            <TextField label="Title" defaultValue={this.state.title} onChange={e => this.setTitle(e.target.value)} fullWidth margin="normal" />
            <TextField label="Description" defaultValue={this.state.desc} onChange={e => this.setDescription(e.target.value)} fullWidth margin="normal" multiline />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker label="Start Time" value={this.state.start} onChange={this.handleStartTime} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
              <TimePicker label="End Time" value={this.state.end} onChange={this.handleEndTime} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
            </LocalizationProvider>
            <div className="dialog-actions">{eventActions}</div>
          </div>
        </Dialog>
        
      </Box>
    );
  }
}

export default Calendar;
