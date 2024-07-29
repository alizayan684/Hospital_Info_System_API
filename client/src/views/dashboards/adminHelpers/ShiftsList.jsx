import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TablePagination,
    TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditShiftDialog from "./EditShiftDialog";

const ShiftsList = () => {
    const [doctors, setDoctors] = useState([{
        id: 1,
        fullName: 'Dr. John Doe',
        shifts: {
            monday: { start: '08:00', end: '16:00' },
            tuesday: { start: '08:00', end: '16:00' },
            wednesday: { start: '08:00', end: '' },
            thursday: { start: '08:00', end: '16:00' },
            friday: { start: '08:00', end: '16:00' },
            saturday: { start: '08:00', end: '' },
            sunday: { start: '08:00', end: '' }
        }
    }, {
        id: 2,
        fullName: 'Dr. Jane Doe',
        shifts: {
            monday: { start: '08:00', end: '' },
            tuesday: { start: '08:00', end: '16:00' },
            wednesday: { start: '08:00', end: '16:00' },
            thursday: { start: '08:00', end: '16:00' },
            friday: { start: '08:00', end: '16:00' },
            saturday: { start: '08:00', end: '16:00' },
            sunday: { start: '08:00', end: '' }
        }
    }]);

    useEffect(() => {
        fetch('http://localhost:3001/api/admin/shifts')
            .then(response => response.json())
            .then(data => {
                const transformedData = data.map(row => {
                    const shifts = {
                        monday: { start: '', end: '' },
                        tuesday: { start: '', end: '' },
                        wednesday: { start: '', end: '' },
                        thursday: { start: '', end: '' },
                        friday: { start: '', end: '' },
                        saturday: { start: '', end: '' },
                        sunday: { start: '', end: '' }
                    };

                    row.shifts.forEach(shift => {
                        if (shift) {
                            let [start, end, day] = shift.split(' - ');
                            start = start.length <= 2 ? start + ':00' : start;
                            end = end.length <= 2 ? end + ':00' : end;
                            start = start.padStart(5, '0');
                            end = end.padStart(5, '0');
                            shifts[day.toLowerCase()] = { start, end };
                        }
                    });

                    return {
                        id: row.doctor_id,
                        fullName: row.doctor_name,
                        shifts
                    };
                });

                setDoctors(transformedData);
            });
    }, []);
    const [open, setOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');


    const handleOpen = (doctor) => {
        console.log(doctor)
        setSelectedDoctor(doctor);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredDoctors = doctors.filter((doctor) => doctor.fullName && doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

    const displayedDoctors = filteredDoctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '4px' }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx ={{
                    color: "#FFF",
                    margin: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#FFF', // Color of the outline when not in focus
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#FFF', // Color of the outline when in focus
                        },
                    },
                    '&:hover fieldset': {
                        borderColor: '#80DED9', // Color of the outline when hovered
                    },
                    '& .MuiInputLabel-root': {
                        color: '#FFF', // Color of the label when not in focus
                        '&.Mui-focused': {
                            color: '#FFF', // Color of the label when in focus
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#FFF', // Color of the input text
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon style={{ color: "#FFF"}} />
                        </InputAdornment>
                    ),
                    // style: { padding: '2px' },
                }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Mon</TableCell>
                            <TableCell>Tue</TableCell>
                            <TableCell>Wed</TableCell>
                            <TableCell>Thu</TableCell>
                            <TableCell>Fri</TableCell>
                            <TableCell>Sat</TableCell>
                            <TableCell>Sun</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedDoctors.map((doctor) => (
                            <TableRow key={doctor.id}>
                                <TableCell>
                                    <Link to={`/doctors/${doctor.id}`}>{doctor.fullName}</Link>
                                </TableCell>
                                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                                    <TableCell>
                                        {(doctor.shifts[day].start !== '' && doctor.shifts[day].end !== '')
                                            ? <div style={{backgroundColor: '#80DED9', width: '20px', height: '20px', outline: "1px solid"}} />
                                            : <div style={{backgroundColor: "#FFF", width: '20px', height: '20px', outline: "1px solid"}} />}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Button variant="contained" style={{backgroundColor: "#E4E6C3"}} onClick={() => handleOpen(doctor)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filteredDoctors.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[3, 5, 10]}
                />
            </TableContainer>
            <EditShiftDialog open={open} handleClose={handleClose} selectedDoctor={selectedDoctor} />
        </div>
    );
}

export default ShiftsList;