import { Box, Button, Divider, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { setActivies } from "../state"
import { useDispatch, useSelector } from "react-redux"
import Activity from "./Activity"
import WidgetWrapper from "../layouts/WidgetWrapper"
import { useNavigate } from "react-router-dom"

const ProfileInfoWidget = ({ userId }) => {

    const token = useSelector((state) => state.token);

    const navigate=useNavigate()
    

    const role = 'Patient';
    // const isPatient = false;
    // const isDoctor = true

    const patient = {
        fullname: 'ahmed mahmoud',
        age: 21,
        smoker: true,
        chronic_diseases: [
            "Coronary Artery Disease",
            "Heart Failure",
            "Arrhythmia"
        ],
    }
    const doctor = {
        fullname: 'Ibrahim fateen',
        age: 20,
        position: 'Electrophysiologist',
        salary: "3000$ ",
        startAt: '2000-01-01'
    }

    const admin = {
        fullname: 'Mohamed harras',
        age: 21,
        position: 'HR',
        salary: "2000 $ ",
        startAt: '2000-01-01'
    }

    return (
        <WidgetWrapper sx={{
            backgroundColor: 'transparent',
        }}>
            <Typography
                color={'lightgray'}
                variant="h3"
                fontWeight="500"
                sx={{
                    mb: "1.5rem",
                    "&::after": {
                        content: '""',
                        position: 'absolute',
                        display: 'block',
                        width: '2.5rem',
                        height: '.1rem',
                        backgroundColor: 'white',
                        marginTop: '0.5rem',

                    },
                    marginBottom: '50px',
                }}
            >
                User Info
            </Typography>

            <Box >
                <Box sx={{
                    height: '100%',
                    color: 'gray',
                    display: 'flex',
                    flexDirection: 'column',
                    "&::after": {
                        content: '""',
                        position: 'absolute',
                        display: 'block',
                        width: '20rem',
                        height: '.1rem',
                        backgroundColor: 'white',
                        marginTop: '6.5rem',
                        marginLeft: '13rem'

                    },

                }}>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '150px',
                        marginBottom: '80px',
                        rowGap: '20px',

                    }}>
                        <Box
                        >
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                }}
                            >
                                {`Full Name `}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                }}
                            >
                                {`Age`}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                }}
                            >
                                {` : ${patient.fullname} `}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                }}
                            >
                                {`: ${patient.age} `}
                            </Typography>
                        </Box>
                    </Box>


                    <Box>

                        {
                            (() => {
                                switch (role) {
                                    case "Patient":
                                        return (
                                            <Box sx={{
                                                display: 'flex',
                                                columnGap: '82px',
                                                marginBottom: '50px'
                                            }}>
                                                <Box>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`Smoker `}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`Chronic Diseases`}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {` : ${patient.smoker} `}
                                                    </Typography>
                                                    <Box>
                                                        {patient.chronic_diseases.map((disease) => (
                                                            <Typography
                                                                sx={{ fontSize: '20px' }}
                                                                key={disease}
                                                            >
                                                                {`- ${disease}`}
                                                            </Typography>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        );
                                    case 'doctor':
                                        return (
                                            <Box sx={{
                                                display: 'flex',
                                                columnGap: '120px',
                                                marginBottom: '30px',
                                            }}>
                                                <Box>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`Position `}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`Start Work At`}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`Salary`}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`: ${doctor.position}`}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`: ${doctor.startAt}`}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`: ${doctor.salary}`}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        );
                                    case 'Admin':
                                        return (
                                            <Box sx={{
                                                display: 'flex',
                                                columnGap: '120px',
                                                marginBottom: '30px',
                                            }}>
                                                <Box>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`Position `}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`Start Work At`}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`Salary`}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`: ${admin.position}`}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`: ${admin.startAt}`}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '20px' }}>
                                                        {`: ${admin.salary}`}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        );
                                    default:
                                        return null;
                                }
                            })()
                        }
                    </Box>


                    <Box sx={{
                        marginTop:'260px',
                        marginLeft:'500px',
                    }}>
                        <Button 
                        onClick={() =>navigate('/dashboard') }
                        sx={{
                            width:'200px',
                            height:'50px',
                            backgroundColor:'#D71D2A',
                            color:'white',
                            "&:hover":{
                                backgroundColor:'#9A0E17'
                            }
                        }}>
                            DashBoard
                        </Button>
                    </Box>


                </Box>
            </Box>

        </WidgetWrapper>
    )
}

export default ProfileInfoWidget