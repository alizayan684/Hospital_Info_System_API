import React, { useState } from 'react';
import {
  Grid, Typography, Dialog, DialogContent, DialogTitle, Paper
} from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, setHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DoctorShifts from './doctorHelpers/DoctorShifts';
import AppointmentsDetails from "./doctorHelpers/AppointmentsDetails";

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const patientsDetails = {
  'John Doe': { 
    name: 'John Doe', 
    age: 45, 
    smoker: 'No', 
    chronicDiseases: 'Hypertension', 
    medicalInfo: [
      { result: 'Blood pressure stable', prescription: 'Lisinopril', dose: '10mg', timesPerDay: 'Once' }
    ],
    phones: ['123-456-7890', '987-654-3210']
  },
  'Jane Smith': { 
    name: 'Jane Smith', 
    age: 30, 
    smoker: 'Yes', 
    chronicDiseases: 'Diabetes', 
    medicalInfo: [
      { result: 'Blood sugar levels high', prescription: 'Metformin', dose: '500mg', timesPerDay: 'Twice' }
    ],
    phones: ['321-654-0987']
  },
  'Emily Johnson': { 
    name: 'Emily Johnson', 
    age: 25, 
    smoker: 'No', 
    chronicDiseases: 'Asthma', 
    medicalInfo: [
      { result: 'Lung function normal', prescription: 'Albuterol', dose: '2 puffs', timesPerDay: 'As needed' }
    ],
    phones: ['555-123-4567']
  },
  'Michael Brown': { 
    name: 'Michael Brown', 
    age: 50, 
    smoker: 'Yes', 
    chronicDiseases: 'None', 
    medicalInfo: [
      { result: 'No issues', prescription: 'None', dose: 'N/A', timesPerDay: 'N/A' }
    ],
    phones: ['444-555-6666']
  },
  'Sarah Davis': { 
    name: 'Sarah Davis', 
    age: 35, 
    smoker: 'No', 
    chronicDiseases: 'Arthritis', 
    medicalInfo: [
      { result: 'Joint inflammation reduced', prescription: 'Ibuprofen', dose: '200mg', timesPerDay: 'Three times' }
    ],
    phones: ['777-888-9999']
  },
};

const placeholderAppointments = [
  { start: new Date(2024, 0, 20, 9, 0), end: new Date(2024, 0, 20, 10, 0), patient: 'John Doe',  },
  { start: new Date(2024, 5, 21, 11, 0), end: new Date(2024, 5, 21, 11, 0), patient: 'Jane Smith',
  usedEquipment: ['Stethoscope', 'Blood Pressure Cuff', 'Thermometer'], },
  { start: new Date(2024, 5, 22, 14, 0), end: new Date(2024, 5, 22, 15, 0), patient: 'Emily Johnson' },
  { start: new Date(2024, 4, 19, 10, 0), end: new Date(2024, 4, 19, 11, 0), patient: 'Michael Brown' },
  { start: new Date(2024, 4, 18, 13, 0), end: new Date(2024, 4, 18, 14, 0), patient: 'Sarah Davis' },
  {start: new Date(2024, 6, 23, 9, 0), end: new Date(2024, 7, 23, 10, 0), patient: 'John Doe'},
];

const DoctorDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = new Date();
  const events = placeholderAppointments
  const appointmentsOnSelectedDate = events.filter(event =>
      setHours(selectedDate, 0) >= setHours(event.start, 0) && setHours(selectedDate, 0) <= setHours(event.end, 0)
  );
  const dayPropGetter = (date) => {
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      return {
        style: {
          backgroundColor: '#80DED9'
        },
      };
    }
    return {
      style: {
        cursor: 'pointer',
        '.hover': {
            backgroundColor: '#E4E6C3',
        },
      },
    };
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#3f51b5';
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return { style };
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
  }


  return (
      <>
        <Grid spacing={2} padding={4} container>
          <Grid item xs={12}>
            <Paper spacing={2} elevation={8} sx={{backgroundColor: "#660000", color: "#FFF"}}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={2} justifyContent="center">
                  <Typography variant="h3" padding={3}>
                    Weekly Shifts
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <DoctorShifts/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={8} padding={2}>
              <Grid container spacing={2} padding={2}>
                <Grid xs={12} textAlign="center">
                  <Typography variant="h3" padding={3}>
                    Appointments
                  </Typography>
                </Grid>
                <Grid item xs={12} justifyContent="center" display="flex">
                  <Calendar
                      localizer={localizer}
                      events={events}
                      startAccessor="start"
                      endAccessor="end"
                      style={{height: 400, width: '80%'}}
                      views={['month']}
                      eventPropGetter={eventStyleGetter}
                      onSelectEvent={handleEventSelect}
                      onSelectSlot={handleSelectSlot}
                      dayPropGetter={dayPropGetter}
                      selectable
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppointmentsDetails appointments={appointmentsOnSelectedDate} past={selectedDate < currentDate}/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={selectedEvent !== null} onClose={() => setSelectedEvent(null)}>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <>
                <Typography variant="body1">
                  Patient: {patientsDetails[selectedEvent.patient].name}
                </Typography>
                <Typography variant="body1">
                  Age: {patientsDetails[selectedEvent.patient].age}
                </Typography>
                <Typography variant="body1">
                  Smoker: {patientsDetails[selectedEvent.patient].smoker}
                </Typography>
                <Typography variant="body1">
                  Chronic Diseases: {patientsDetails[selectedEvent.patient].chronicDiseases}
                </Typography>
                <Typography variant="body1">
                  Medical Information:
                  <ul>
                    {patientsDetails[selectedEvent.patient].medicalInfo.map((info, index) => (
                      <li key={index}>
                        Result: {info.result}, Prescription: {info.prescription}, Dose: {info.dose}, Times Per Day: {info.timesPerDay}
                      </li>
                    ))}
                  </ul>
                </Typography>
                <Typography variant="body1">
                  Phone Numbers:
                  <ul>
                    {patientsDetails[selectedEvent.patient].phones.map((phone, index) => (
                      <li key={index}>{phone}</li>
                    ))}
                  </ul>
                </Typography>
                <Typography variant="body1">
                  Date: {selectedEvent.start.toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Time: {selectedEvent.start.toLocaleTimeString()}
                </Typography>
              </>
            )}
          </DialogContent>
        </Dialog>
      </>
  );
};

export default DoctorDashboard;
