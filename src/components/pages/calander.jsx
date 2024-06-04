import React, { Component } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TimePicker from "@mui/lab/TimePicker";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,  faChalkboardTeacher, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./customtoolbar";
import '../pages/style.css';

const localizer = momentLocalizer(moment);

function Cards() {
    // Define an array of objects containing the icon, color, and text
    const cardData = [
      { icon: faUser, color: "#FF5733", text: "Student" },
      { icon: faChalkboardTeacher, color: "#3399FF", text: "Teacher" },
      { icon: faUser, color: "rgb(105 175 122)", text: "Parent" },
      { icon: faBullhorn, color: "rgb(96 102 161)", text: "Announcements" }
    ];
  
    return (
      <div className="cardcontainer">
        {cardData.map((card, index) => (
          <div className="cardsec2" key={index}>
            <div className="icon-container" style={{ color: card.color }}>
              <FontAwesomeIcon icon={card.icon} className="icon " />
            </div>
            {/* Display the text dynamically */}
            <div class="textstyle">Add {card.text}</div>
          </div>
        ))}
      </div>
    );
  }

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      title: "",
      start: "",
      end: "",
      desc: "",
      openSlot: false,
      openEvent: false,
      clickedEvent: {}
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ openEvent: false, openSlot: false });
  }

  handleSlotSelected(slotInfo) {
    this.setState({
      title: "",
      desc: "",
      start: slotInfo.start,
      end: slotInfo.end,
      openSlot: true
    });
  }

  handleEventSelected(event) {
    this.setState({
      openEvent: true,
      clickedEvent: event,
      start: event.start,
      end: event.end,
      title: event.title,
      desc: event.desc
    });
  }

  setTitle(e) {
    this.setState({ title: e });
  }

  setDescription(e) {
    this.setState({ desc: e });
  }

  handleStartTime = (date) => {
    this.setState({ start: date });
  };

  handleEndTime = (date) => {
    this.setState({ end: date });
  };

  setNewAppointment() {
    const { start, end, title, desc } = this.state;
    let appointment = { title, start, end, desc };
    let events = this.state.events.slice();
    events.push(appointment);
    this.setState({ events });
  }

  updateEvent() {
    const { title, desc, start, end, events, clickedEvent } = this.state;
    const index = events.findIndex(event => event === clickedEvent);
    const updatedEvent = events.slice();
    updatedEvent[index].title = title;
    updatedEvent[index].desc = desc;
    updatedEvent[index].start = start;
    updatedEvent[index].end = end;
    this.setState({
      events: updatedEvent
    });
  }

  deleteEvent() {
    let updatedEvents = this.state.events.filter(
      event => event["start"] !== this.state.start
    );
    this.setState({ events: updatedEvents });
  }

  render() {
    const eventActions = [
      <Button
        key="cancel"
        variant="contained"
        color="primary"
        onClick={this.handleClose}
      >
        Cancel
      </Button>,
      <Button
        key="delete"
        variant="contained"
        color="secondary"
        onClick={() => {
          this.deleteEvent();
          this.handleClose();
        }}
      >
        Delete
      </Button>,
      <Button
        key="confirm"
        variant="contained"
        color="primary"
        onClick={() => {
          this.updateEvent();
          this.handleClose();
        }}
      >
        Confirm Edit
      </Button>
    ];

    const appointmentActions = [
      <Button
        key="cancel"
        variant="contained"
        color="secondary"
        onClick={this.handleClose}
      >
        Cancel
      </Button>,
      <Button
        key="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          this.setNewAppointment();
          this.handleClose();
        }}
      >
        Submit
      </Button>
    ];

    return (
      <div className="flex-container">
        <div className="calendar-container" style={{ width: "60%" }}>
          <BigCalendar
            localizer={localizer}
            events={this.state.events}
            views={["month", "week", "day", "agenda"]}
            timeslots={2}
            defaultView="month"
            defaultDate={new Date()}
            selectable={true}
            onSelectEvent={event => this.handleEventSelected(event)}
            onSelectSlot={slotInfo => this.handleSlotSelected(slotInfo)}
            components={{
              toolbar: CustomToolbar
            }}
          />

          <Dialog
            open={this.state.openSlot}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <div>
              <h2>Add an Event {moment(this.state.start).format("MMMM Do YYYY")}</h2>
              {appointmentActions}
              <TextField
                label="Title"
                onChange={e => {
                  this.setTitle(e.target.value);
                }}
              />
              <br />
              <TextField
                label="Description"
                onChange={e => {
                  this.setDescription(e.target.value);
                }}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Start Time"
                  value={this.state.start}
                  onChange={this.handleStartTime}
                />
                <TimePicker
                  label="End Time"
                  value={this.state.end}
                  onChange={this.handleEndTime}
                />
              </LocalizationProvider>
            </div>
          </Dialog>

          <Dialog
            open={this.state.openEvent}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <div>
              <h2>View/Edit Appointment of {moment(this.state.start).format("MMMM Do YYYY")}</h2>
              {eventActions}
              <TextField
                label="Title"
                defaultValue=
                {this.state.title}
                onChange={e => {
                  this.setTitle(e.target.value);
                }}
              />
              <br />
              <TextField
                label="Description"
                defaultValue={this.state.desc}
                onChange={e => {
                  this.setDescription(e.target.value);
                }}
                multiline
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Start Time"
                  value={this.state.start}
                  onChange={this.handleStartTime}
                />
                <TimePicker
                  label="End Time"
                  value={this.state.end}
                  onChange={this.handleEndTime}
                />
              </LocalizationProvider>
            </div>
          </Dialog>
        </div>
        
        <div style={{ width: "40%" }}>
          <Cards />
        </div>
      </div>
    );
  }
}

export default Calendar;
