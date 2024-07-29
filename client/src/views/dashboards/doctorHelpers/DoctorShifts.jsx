import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import {
    Box,
    Button,
    Typography,
    Tooltip,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl, TextField
} from "@mui/material";

const DoctorShifts = () => {
    // const doctorId = useSelector(state => state.user).rows[0].id
    const doctorId = 1;

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [shifts, setShifts] = useState({
      monday: { start: "08:00", end: "16:00" },
      tuesday: { start: "", end: "" },
      wednesday: { start: "", end: "" },
      thursday: { start: "16:00", end: "23:00" },
      friday: { start: "", end: "" },
      saturday: { start: "08:00", end: "23:59" },
      sunday: { start: "", end: "" },
    });
    const [newStartTime, setNewStartTime] = useState(null);
    const [newEndTime, setNewEndTime] = useState(null);

    const handleOpenDialog = (day) => {
        setSelectedDay(day);
        setOpenDialog(true);
    }

    const handleSave = async() => {
        const response = await fetch(`/api/doctors/${doctorId}/shifts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: selectedDay,
                start: newStartTime,
                end: newEndTime
            })
        });

        if (response.ok) {
            handleCloseDialog()
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    // useEffect(() => {
    //     fetch(`/api/doctors/${doctorId}/shifts`)
    //         .then(response => response.json())
    //         .then(data => setShifts(data));
    // }, [doctorId]);

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return (
        <Box display="flex" justifyContent="space-around" alignItems="center">
            {days.map(day => (
                <Box key={day} textAlign="center">
                    <Tooltip title={`Start: ${shifts[day].start}, End: ${shifts[day].end}`} placement="right" arrow followCursor>
                        <Grid container padding={1} height='100%' justifyContent="center" alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    {day.charAt(0).toUpperCase() + day.slice(1)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} display="flex" justifyContent="center">
                                <Box
                                    width={25}
                                    height={25}
                                    bgcolor={shifts[day].start && shifts[day].end ? '#80DED9' : '#000'}
                                    border={4}
                                    borderColor="#80DED9"
                                    m={1}
                                />
                            </Grid>
                        </Grid>
                    </Tooltip>
                    <Button variant="contained" style={{backgroundColor: "#E4E6C3"}} onClick={() => handleOpenDialog(day)}>
                        Request Change
                    </Button>
                </Box>
            ))}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Change Shift</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <Grid container padding={2} spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Day" value={selectedDay} disabled fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Current Start Time" value={shifts[selectedDay]?.start} type="time" disabled fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Current End Time" value={shifts[selectedDay]?.end} type="time" disabled fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="New Start Time" type="time" fullWidth onChange={(e) => setNewStartTime(e.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="New End Time" type="time" fullWidth onChange={(e) => setNewEndTime(e.target.value)} />
                            </Grid>
                        </Grid>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DoctorShifts;