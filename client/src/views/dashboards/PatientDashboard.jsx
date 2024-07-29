import React, { useState } from "react";
import NavBar from "../Bars/NavBar.jsx";
import Footer from "../Bars/Footer.jsx";
import SideBar from "../Bars/SideBar.jsx";
import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    Autocomplete,
    Modal,
    TextField,
    MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    LocalizationProvider,
    DatePicker,
    TimePicker,
} from "@mui/x-date-pickers";
import { CSSTransition } from "react-transition-group";

const doctors = [
    { label: "Dr. John Doe", value: "john_doe" },
    { label: "Dr. Jane Smith", value: "jane_smith" },
    { label: "Dr. Emily Johnson", value: "emily_johnson" },
];

const appointmentTypes = [
    "Routine Check-up",
    "Follow-up Appointment",
    "Initial Consultation",
    "Periodic Visit",
    "Preventive Care Visit",
];

const prescriptionsData = [
    {
        id: 1,
        date: "2024-06-21",
        description: "Prescription 1",
        picturePath: "/339ea40f-55ed-4c2a-912c-48e0eefba8fc.jpeg",
    },
    {
        id: 2,
        date: "2024-06-20",
        description: "Prescription 2",
        picturePath: "/Ashley-McPhail.png",
    },
    {
        id: 3,
        date: "2024-06-19",
        description: "Prescription 3",
        picturePath: "/Ashley-McPhail.png",
    },
    {
        id: 1,
        date: "2024-06-21",
        description: "Prescription 1",
        picturePath: "/Ashley-McPhail.png",
    },
    {
        id: 2,
        date: "2024-06-20",
        description: "Prescription 2",
        picturePath: "/Ashley-McPhail.png",
    },
    {
        id: 3,
        date: "2024-06-19",
        description: "Prescription 3",
        picturePath: "/Ashley-McPhail.png",
    },
    {
        id: 1,
        date: "2024-06-21",
        description: "Prescription 1",
        picturePath: "/Ashley-McPhail.png",
    },
    {
        id: 2,
        date: "2024-06-20",
        description: "Prescription 2",
        picturePath: "/Ashley-McPhail.png",
    },
    {
        id: 3,
        date: "2024-06-19",
        description: "Prescription 3",
        picturePath: "/Ashley-McPhail.png",
    },

    // Add more prescriptions as needed
];

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
};

const PatientDashboard = () => {
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedAppointmentType, setSelectedAppointmentType] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleReset = () => {
        setSelectedDoctor("");
        setSelectedAppointmentType("");
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleConfirm = () => {
        const appointmentDetails = {
            doctor: selectedDoctor,
            appointmentType: selectedAppointmentType,
            date: selectedDate,
            time: selectedTime,
        };
        console.log("Appointment confirmed with details:", appointmentDetails);
        // Handle further logic for confirmation, such as sending the data to a server
    };

    // ***********************************************

    const [displayedPrescriptions, setDisplayedPrescriptions] = useState(4);

    const showMorePrescriptions = () => {
        setDisplayedPrescriptions(displayedPrescriptions + 4);
    };
    // ***********************************************


    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = (imagePath) => {
        setSelectedImage(imagePath);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    minHeight: "100vh",
                    backgroundColor: "lightGray",
                }}
            >
                {/* <SideBar children={"Dashboard"} /> */}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: 'center',
                            backgroundColor: "#DEDEDE",
                            padding: '10px 70px',
                        }}>
                        <Box sx={{
                            width: "45%",
                            // display: "flex",
                            // flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <Box sx={{

                                display: 'flex',
                                // backgroundColor: "gray",
                                margin: "50px 10px",
                                marginLeft: '60px',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}>

                                <img src="/Medical-doctors-and-nurse-practitioners-discuss-paperwork-in-a-hallway.jpg" width={'300px'} height={'450px'} alt="my image" />

                                <Box sx={{
                                    display: "flex",
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    padding: '30px'
                                }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        paddingBottom: '20px',
                                    }}>
                                        At our hospital, we take immense pride in our team of highly skilled and compassionate doctors who are dedicated to providing exceptional medical care.
                                    </Typography>
                                    <Typography sx={{
                                        paddingBottom: '20px',
                                        fontSize: '14px'
                                    }}>
                                        Each of our doctors is a specialist in their respective fields, bringing years of experience, advanced training, and a commitment to patient well-being.
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        paddingBottom: '20px',
                                    }}>
                                        Whether you need a consultation with a renowned cardiologist, a skilled surgeon, or a trusted pediatrician, our doctors are here to offer personalized and comprehensive healthcare services. To book an appointment with any of our esteemed doctors, please visit our appointment section, where you can conveniently schedule your visit at a time that suits you.
                                    </Typography>
                                </Box>

                            </Box>
                        </Box>

                        <Divider orientation="vertical" sx={{ width: '5px', height: '60%', marginTop: '80px' }} />
                        <Box
                            sx={{
                                flexGrow: 1,
                                padding: "10px 40px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                // marginLeft: "50px",
                                paddingBottom: '100px'

                            }}
                        >
                            <Box sx={{ width: "100%", paddingLeft: "40px" }}>
                                <CSSTransition
                                    in={true}
                                    appear={true}
                                    timeout={500}
                                    classNames="slide-left"
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignSelf: "flex-start",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "30px" }}>
                                            Book an Appointment
                                        </Typography>
                                    </Box>
                                </CSSTransition>
                                <Divider
                                    sx={{
                                        width: "10%",
                                        height: "2px",
                                        backgroundColor: "black",
                                        marginTop: "25px",
                                    }}
                                />
                            </Box>
                            <CSSTransition
                                in={true}
                                appear={true}
                                timeout={500}
                                classNames="slide-right"
                            >
                                <Box
                                    sx={{
                                        mt: 5,
                                        ml: 5,
                                        width: "95%",
                                        padding: "30px ",
                                        backgroundColor: "white",
                                        borderLeft: "3px solid black",
                                    }}
                                >
                                    <Box sx={{ padding: "0 20px" }}>
                                        <TextField
                                            select
                                            label="Select Doctor"
                                            value={selectedDoctor}
                                            onChange={(e) => setSelectedDoctor(e.target.value)}
                                            fullWidth
                                            margin="normal"
                                        // sx={{ mb: "25px" }}
                                        >
                                            {doctors.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            select
                                            label="Appointment Type"
                                            value={selectedAppointmentType}
                                            onChange={(e) => setSelectedAppointmentType(e.target.value)}
                                            fullWidth
                                            margin="normal"
                                        // sx={{ mb: "25px" }}
                                        >
                                            {appointmentTypes.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                    <Box
                                        sx={{
                                            padding: "10px 20px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{ paddingRight: "20px", width: "50%" }}
                                                label="Select Date"
                                                value={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                renderInput={(params) => (
                                                    <TextField {...params} margin="normal" />
                                                )}
                                            />
                                            <TimePicker
                                                sx={{ width: "50%" }}
                                                label="Select Time"
                                                value={selectedTime}
                                                onChange={(time) => setSelectedTime(time)}
                                                renderInput={(params) => (
                                                    <TextField {...params} fullWidth margin="normal" />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                    <Box
                                        sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                                    >
                                        <Button
                                            onClick={handleReset}
                                            color="secondary"
                                            variant="contained"
                                            sx={{ margin: "0 20px", padding: "15px 50px" }}
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            onClick={handleConfirm}
                                            color="primary"
                                            variant="contained"
                                            sx={{ margin: "0 20px", padding: "15px 50px" }}
                                        >
                                            Confirm
                                        </Button>
                                    </Box>
                                </Box>
                            </CSSTransition>
                        </Box>

                    </Box>

                    <Box
                        sx={{

                            width: "100%",
                            padding: "30px 0 ",
                            backgroundColor: "rgb(102 0 0)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <CSSTransition
                            in={true}
                            appear={true}
                            timeout={500}
                            classNames="opacity-transition"
                        >
                            <Box sx={{
                                width: "87.5%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                                <Box sx={{ width: "100%" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignSelf: "flex-start",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "30px", color: 'white' }}>
                                            Latest Prescription
                                        </Typography>
                                    </Box>

                                    <Divider
                                        sx={{
                                            width: "10%",
                                            height: "2px",
                                            backgroundColor: "white",
                                            marginTop: "25px",
                                            marginBottom: "50px",
                                        }}
                                    />
                                </Box>

                                <Grid container spacing={3}>
                                    {prescriptionsData
                                        .slice(0, displayedPrescriptions)
                                        .map((prescription) => (
                                            <Grid item key={prescription.id} xs={12} sm={6} md={3}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h6" component="div">
                                                            Prescription {prescription.id}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Date: {prescription.date}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1,mb: 1 }}>
                                                            Description: {prescription.description}
                                                        </Typography>
                                                        <img
                                                            src={prescription.picturePath}
                                                            alt="Prescription"
                                                            style={{ width: '100%', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                                                            onClick={() => handleOpen(prescription.picturePath)}
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                </Grid>

                                <Modal open={open} onClose={handleClose}>
                                    <Box sx={modalStyle}>
                                        <img src={selectedImage} alt="Prescription" style={{ width: '100%' }} />
                                    </Box>
                                </Modal>
                                {displayedPrescriptions < prescriptionsData.length && (
                                    <Button
                                        onClick={showMorePrescriptions}

                                        color="primary"
                                        variant="contained"
                                        sx={{ margin: "30px 20px", padding: "15px 50px" }}

                                    >
                                        Show More
                                    </Button>
                                )}
                            </Box>
                        </CSSTransition>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default PatientDashboard;