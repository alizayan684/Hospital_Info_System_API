import React, { useState } from 'react';
import {
    TextField,
    Grid,
    Button,
    DialogActions,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Checkbox
} from '@mui/material';

const EditShiftDialog = ({ open, handleClose, selectedDoctor }) => {
    const savedShifts = selectedDoctor.shifts;
    const [monday, setMonday] = useState(savedShifts.monday);
    const [tuesday, setTuesday] = useState(savedShifts.tuesday);
    const [wednesday, setWednesday] = useState(savedShifts.wednesday);
    const [thursday, setThursday] = useState(savedShifts.thursday);
    const [friday, setFriday] = useState(savedShifts.friday);
    const [saturday, setSaturday] = useState(savedShifts.saturday);
    const [sunday, setSunday] = useState(savedShifts.sunday);

    const [isMondayRemoved, setIsMondayRemoved] = useState(!savedShifts.monday.start || !savedShifts.monday.end);
    const [isTuesdayRemoved, setIsTuesdayRemoved] = useState(!savedShifts.tuesday.start || !savedShifts.tuesday.end);
    const [isWednesdayRemoved, setIsWednesdayRemoved] = useState(!savedShifts.wednesday.start || !savedShifts.wednesday.end);
    const [isThursdayRemoved, setIsThursdayRemoved] = useState(!savedShifts.thursday.start || !savedShifts.thursday.end);
    const [isFridayRemoved, setIsFridayRemoved] = useState(!savedShifts.friday.start || !savedShifts.friday.end);
    const [isSaturdayRemoved, setIsSaturdayRemoved] = useState(!savedShifts.saturday.start || !savedShifts.saturday.end);
    const [isSundayRemoved, setIsSundayRemoved] = useState(!savedShifts.sunday.start || !savedShifts.sunday.end);

    const handleSave = (event) => {
        // handle form submission here
        const { id, shifts } = selectedDoctor;

        fetch(`http://localhost:3001/api/admin/shifts/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                days: {
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday,
                    sunday,
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        handleClose();
    };

    const handleRemoveDay = (day, setDay, setIsDayRemoved) => {
        return (event) => {
            setIsDayRemoved(event.target.checked);
            if (event.target.checked) {
                setDay({ start: '', end: '' });
            } else {
                setDay({ start: '09:00', end: '17:00' });
            }
        };
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ backgroundColor: "#80DED9", color:"#000"}}>
                <Typography variant="h4">
                    Edit Shifts
                </Typography>
            </DialogTitle>
            <DialogContent>
                <form>
                    <Grid container spacing={3} height='100%' padding={2}>
                        <Grid item container spacing={3} alignItems="center" xs={12}>
                            <Grid item xs={2}>
                                <Typography variant="h6">
                                    Monday:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Start"
                                    type="time"
                                    value={monday.start}
                                    onChange={(e) => setMonday({ ...monday, start: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isMondayRemoved}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="End"
                                    type="time"
                                    value={monday.end}
                                    onChange={(e) => setMonday({ ...monday, end: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isMondayRemoved}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    checked={isMondayRemoved}
                                    onChange={handleRemoveDay(monday, setMonday, setIsMondayRemoved)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={3} alignItems="center" xs={12}>
                            <Grid item xs={2}>
                                <Typography variant="h6">
                                    Tuesday:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Start"
                                    type="time"
                                    value={tuesday.start}
                                    onChange={(e) => setTuesday({ ...tuesday, start: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isTuesdayRemoved}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="End"
                                    type="time"
                                    value={tuesday.end}
                                    onChange={(e) => setTuesday({ ...tuesday, end: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isTuesdayRemoved}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    checked={isTuesdayRemoved}
                                    onChange={handleRemoveDay(tuesday, setTuesday, setIsTuesdayRemoved)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={3} alignItems="center">
                            <Grid item xs={2}>
                                <Typography variant="h6">
                                    Wednesday:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Start"
                                    type="time"
                                    value={wednesday.start}
                                    onChange={(e) => setWednesday({ ...wednesday, start: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isWednesdayRemoved}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="End"
                                    type="time"
                                    value={wednesday.end}
                                    onChange={(e) => setWednesday({ ...wednesday, end: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isWednesdayRemoved}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    checked={isWednesdayRemoved}
                                    onChange={handleRemoveDay(wednesday, setWednesday, setIsWednesdayRemoved)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={3} alignItems="center">
                            <Grid item xs={2}>
                                <Typography variant="h6">
                                    Thursday:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Start"
                                    type="time"
                                    value={thursday.start}
                                    onChange={(e) => setThursday({ ...thursday, start: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isThursdayRemoved}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="End"
                                    type="time"
                                    value={thursday.end}
                                    onChange={(e) => setThursday({ ...thursday, end: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isThursdayRemoved}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    checked={isThursdayRemoved}
                                    onChange={handleRemoveDay(thursday, setThursday, setIsThursdayRemoved)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={3} alignItems="center">
                            <Grid item xs={2}>
                                <Typography variant="h6">
                                    Friday:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Start"
                                    type="time"
                                    value={friday.start}
                                    onChange={(e) => setFriday({ ...friday, start: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isFridayRemoved}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="End"
                                    type="time"
                                    value={friday.end}
                                    onChange={(e) => setFriday({ ...friday, end: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isFridayRemoved}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    checked={isFridayRemoved}
                                    onChange={handleRemoveDay(friday, setFriday, setIsFridayRemoved)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={3} alignItems="center">
                            <Grid item xs={2}>
                                <Typography variant="h6">
                                    Saturday:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Start"
                                    type="time"
                                    value={saturday.start}
                                    onChange={(e) => setSaturday({ ...saturday, start: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isSaturdayRemoved}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="End"
                                    type="time"
                                    value={saturday.end}
                                    onChange={(e) => setSaturday({ ...saturday, end: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isSaturdayRemoved}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    checked={isSaturdayRemoved}
                                    onChange={handleRemoveDay(saturday, setSaturday, setIsSaturdayRemoved)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={3} alignItems="center">
                            <Grid item xs={2}>
                                <Typography variant="h6">
                                    Sunday:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Start"
                                    type="time"
                                    value={sunday.start}
                                    onChange={(e) => setSunday({ ...sunday, start: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isSundayRemoved}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="End"
                                    type="time"
                                    value={sunday.end}
                                    onChange={(e) => setSunday({ ...sunday, end: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{marginBottom: 2}}
                                    fullWidth
                                    disabled={isSundayRemoved}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    checked={isSundayRemoved}
                                    onChange={handleRemoveDay(sunday, setSunday, setIsSundayRemoved)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions padding={4}>
                <Button onClick={handleClose}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditShiftDialog;