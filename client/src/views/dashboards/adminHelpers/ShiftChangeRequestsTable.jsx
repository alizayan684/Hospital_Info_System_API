import React, { useEffect, useState } from 'react';
import {Button, TablePagination} from '@mui/material';
import {Link} from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ShiftChangeRequestsTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const [shiftChangeRequests, setShiftChangeRequests] = useState([
        {
            id: '1',
            doctor_name: 'Dr. John Doe',
            doctor_id: '123',
            day: 'Monday',
            oldTime: {
                start: '08:00',
                end: '16:00'
            },
            newTime: {
                start: '08:00',
                end: '12:00'
            }
        },
    ]);

    useEffect(() => {
        fetch('http://localhost:3001/api/admin/shift_requests') // replace with your API endpoint
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setShiftChangeRequests(data)
            });
    }, []);

    const handleApprove = (requestId) => {
        // Handle approval logic here
    };

    const handleReject = (requestId) => {
        // Handle rejection logic here
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Doctor</TableCell>
                        <TableCell>Changed Day</TableCell>
                        <TableCell>Old Time</TableCell>
                        <TableCell>New Time</TableCell>
                        <TableCell>Approve</TableCell>
                        <TableCell>Reject</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shiftChangeRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>
                                <Link to={`/doctors/${request.doctor_id}`}>{request.doctor_name}</Link>
                            </TableCell>
                            <TableCell>{request.day}</TableCell>
                            <TableCell>{request.start_time}-{request.end_time}</TableCell>
                            <TableCell>{request.req_start_time}-{request.req_end_time}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleApprove(request.id)} sx={{backgroundColor: "#E4E6C3"}}>
                                    Approve
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => handleReject(request.id)} sx={{backgroundColor: "#80DED9"}}>
                                    Reject
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={shiftChangeRequests.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[3, 5, 10]}
            />
        </TableContainer>
    );
};

export default ShiftChangeRequestsTable;