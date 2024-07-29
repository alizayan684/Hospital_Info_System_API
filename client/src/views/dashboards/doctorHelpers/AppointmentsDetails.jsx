import React, { useState } from "react";
import {
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    List,
    ListItem,
    ListItemText,
    CardMedia, Typography, Box, Divider
} from "@mui/material";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import {Link} from "react-router-dom";

const AppointmentsDetails = ({ appointments, past }) => {
    const [open, setOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [scans, setScans] = useState([]);
    const [labResults, setLabResults] = useState([]);
    const [prescription, setPrescription] = useState('');

    const handleOpen = (appointment) => {
        setSelectedAppointment(appointment);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Save the changes to the appointment here
        handleClose();
    };

    const handlePdfDownload = (url) => {
        window.open(url, '_blank');
    };

    const handleFileChange = (event, setFiles) => {
        setFiles(Array.from(event.target.files));
    };

    const handlePrescriptionChange = (event) => {
        setPrescription(event.target.value);
    };

    return (
        <>
            <Grid container spacing={3}>
                {appointments.map(appointment => (
                    <Grid item xs={4} key={appointment.id}>
                        <Typography variant="h6">Date: {appointment.date}</Typography>
                        <Typography variant="h6">Appointment Type: {appointment.type}</Typography>
                        <Typography variant="h6">
                            Patient: {' '}
                            <Link to={`/patient/${appointment.patientId}`}>
                                {appointment.patient}
                            </Link>
                        </Typography>
                        <Divider />
                        <br />
                        {past &&
                            <>
                                <Typography variant="h6">Prescriptions</Typography>
                                {appointment.prescriptions && appointment.prescriptions.length > 0 && (
                                    <List>
                                        {appointment.prescriptions.map((prescription, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={prescription}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                                <Typography variant="h6">Lab Results</Typography>
                                {appointment.labResults && appointment.labResults.length > 0 && (
                                    <Grid container spacing={3}>
                                        {appointment.labResults.map((result, index) => (
                                            <Grid item xs={3} key={index}>
                                                <Button
                                                    key={index}
                                                    onClick={() => handlePdfDownload(result.url)}
                                                    variant="contained"
                                                    color="primary"
                                                    style={{backgroundColor: "#E4E6C3"}}
                                                >
                                                    <PdfIcon />
                                                    <ListItemText primary={result.title}/>
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                                <Typography variant="h6">Scans</Typography>
                                {appointment.scans && appointment.scans.length > 0 && (
                                    <>
                                        {appointment.scans.map((scan, index) => (
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={scan}
                                                alt={`Scan ${index + 1}`}
                                                key={index}
                                            />
                                        ))}
                                    </>
                                )}
                                <Typography variant="h6">Used Equipment</Typography>
                                {appointment.usedEquipment && appointment.usedEquipment.length > 0 && (
                                    <List>
                                        {appointment.usedEquipment.map((equipment, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={equipment}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                                {appointment.notes && (
                                    <Typography variant="h6">
                                        Doctor's Notes: {appointment.note}
                                    </Typography>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{backgroundColor: "#E4E6C3"}}
                                    onClick={() => handleOpen(appointment)}
                                >
                                    Edit
                                </Button>
                            </>
                        }
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Appointment</DialogTitle>
                <DialogContent>
                    {selectedAppointment && (
                        <Grid container spacing={2} padding={3}>
                            <Grid item xs={12}>
                                <TextField label="Patient" defaultValue={selectedAppointment.patient} disabled fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Date" defaultValue={selectedAppointment.date} disabled fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Prescription"
                                    value={prescription}
                                    onChange={handlePrescriptionChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">Upload Scans:</Typography>
                                <input
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={(event) => handleFileChange(event, setScans)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">Upload Lab Results:</Typography>
                                <input
                                    accept=".pdf"
                                    multiple
                                    type="file"
                                    onChange={(event) => handleFileChange(event, setLabResults)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box justifyContent="flex-end">
                                    <Button variant="contained" onClick={handleClose} margin={2}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleSave} margin={2}>
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AppointmentsDetails;