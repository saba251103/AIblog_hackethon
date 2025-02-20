import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip
} from "@mui/material";

const localizer = momentLocalizer(moment);

// Urgency configurations
const URGENCY_LEVELS = {
  high: { label: 'High', color: '#dc2626' },   // red
  medium: { label: 'Medium', color: '#f59e0b' }, // amber
  low: { label: 'Low', color: '#10b981' }      // green
};

const COLOR_PALETTE = [
  { name: 'Blue', color: '#0070F3' },
  { name: 'Green', color: '#17C964' },
  { name: 'Red', color: '#F31260' },
  { name: 'Yellow', color: '#F5A524' },
  { name: 'Purple', color: '#7828C8' }
];

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ 
    title: "", 
    start: null, 
    end: null,
    color: COLOR_PALETTE[0].color,
    description: "",
    urgency: "medium"
  });

  const handleSelectSlot = (slotInfo) => {
    setNewEvent({ 
      title: "", 
      start: moment(slotInfo.start), 
      end: moment(slotInfo.end),
      color: COLOR_PALETTE[0].color,
      description: "",
      urgency: "medium"
    });
    setIsEditing(false);
    setOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({ 
      ...event,
      start: moment(event.start),
      end: moment(event.end)
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const eventToSave = {
        ...newEvent,
        start: newEvent.start.toDate(),
        end: newEvent.end.toDate()
      };
      
      if (isEditing) {
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event === selectedEvent ? eventToSave : event
          )
        );
      } else {
        setEvents(prevEvents => [...prevEvents, eventToSave]);
      }
      setOpen(false);
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(prevEvents => 
        prevEvents.filter(event => event !== selectedEvent)
      );
      setOpen(false);
      setSelectedEvent(null);
    }
  };

  const eventStyleGetter = (event) => {
    const urgencyColor = URGENCY_LEVELS[event.urgency].color;
    return {
      style: {
        backgroundColor: event.color,
        borderLeft: `5px solid ${urgencyColor}`,
        color: 'white',
        borderRadius: '4px',
        opacity: 0.8,
        padding: '4px 8px'
      }
    };
  };

  return (
    <Box sx={{ height: '100%', p: 2 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        defaultView="week"
      />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditing ? "Edit Event" : "Add New Event"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Event Title"
                fullWidth
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Urgency Level</InputLabel>
                <Select
                  value={newEvent.urgency}
                  label="Urgency Level"
                  onChange={(e) => setNewEvent({ ...newEvent, urgency: e.target.value })}
                >
                  {Object.entries(URGENCY_LEVELS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Event Color</InputLabel>
                <Select
                  value={newEvent.color}
                  label="Event Color"
                  onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                >
                  {COLOR_PALETTE.map((color) => (
                    <MenuItem key={color.name} value={color.color}>{color.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          {isEditing && (
            <Button onClick={handleDeleteEvent} color="error">
              Delete
            </Button>
          )}
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddEvent}>{isEditing ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyCalendar;
