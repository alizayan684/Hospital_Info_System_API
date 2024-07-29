import React from "react";
import AdminDashboard from "./AdminDashboard";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import NavBar from "../Bars/NavBar";
import {Paper, Typography} from "@mui/material";
import Footer from "../Bars/Footer";

const Dashboard = () => {
    const userRole = useSelector(state => state.user.rows[0].role)
    console.log(userRole)

    const roleComponents = {
        admin: AdminDashboard,
        doctor: DoctorDashboard,
        patient: PatientDashboard,
    }

    const RoleComponent = roleComponents[userRole] || Navigate;

    return (
        <>
            <NavBar />
            <Paper elevation={15} sx={{backgroundColor: "#80DED9"}}>
                <Typography variant="h1" padding={3}>
                    Dashboard
                </Typography>
            </Paper>
            <RoleComponent to="/" />
            <Footer />
        </>
    )
}

export default Dashboard;