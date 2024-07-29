import React, { createContext, useState } from "react";
import { Paper, Typography } from "@mui/material";
import ShiftChangeRequestsTable from "./adminHelpers/ShiftChangeRequestsTable";
import AddUserBox from "./adminHelpers/AddUserBox";
import ShiftsList from "./adminHelpers/ShiftsList";
import AdminsCount from "./adminHelpers/AdminsCount";
import DoctorsCount from "./adminHelpers/DoctorsCount";
import ShiftsBarChart from "./adminHelpers/ShiftsBarChart";
import { UserAddedProvider } from "./adminHelpers/UserAddedContext";
import Grid from "@mui/material/Unstable_Grid2";
import MostUsedDevice from "./adminHelpers/MostUsedDevice";
import AddDevice from "./adminHelpers/AddDevice";
import AppointmentTypeDistribution from "./adminHelpers/AppointmentTypeDistribution";
import Footer from "../Bars/Footer";
import NavBar from "../Bars/NavBar";

const AdminDashboard = () => {
    return (
        <Grid container spacing={2} padding={4}>
            <Grid xs={12} md={7}>
                <Paper spacing={2} elevation={8} sx={{ backgroundColor: "#660000", height: "100%", color: "#FFF" }}>
                    <Typography variant="h3" padding={3}>
                        Doctors' Shifts
                    </Typography>
                    <ShiftsList />
                </Paper>
            </Grid>
            <Grid xs={12} md={5} >
                <Paper elevation={8} sx={{ height: '10p[[0%' }}>
                    <Grid container spacing={2} padding={4}>
                        <UserAddedProvider>
                            <Grid item xs={12}>
                                <AddUserBox fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <AdminsCount fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <DoctorsCount fullWidth />
                            </Grid>
                        </UserAddedProvider>
                        <Grid xs={12}>
                            <ShiftsBarChart />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid xs={12} md={6}>
                <Paper elevation={8} sx={{ height: '100%' }}>
                    <Grid container spacing={2} padding={4}>
                        <Grid item xs={12} md={6}>
                            <MostUsedDevice fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
                            <AddDevice fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <AppointmentTypeDistribution />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid xs={12} md={6}>
                <Paper elevation={8} sx={{ backgroundColor: "#660000", height: "100%", color: "#FFF" }} >
                    <Typography variant="h3" padding={3}>
                        Shift Change Requests
                    </Typography>
                    <ShiftChangeRequestsTable />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default AdminDashboard;