import React from 'react'
import NavBar from '../Bars/NavBar.jsx'
import { Box, Divider, Typography, Grid } from '@mui/material'
import Footer from '../Bars/Footer.jsx'
import FlexBetween from '../../layouts/FlexBetween.jsx'
import SideBar from '../Bars/SideBar.jsx'


const Services = () => {
    return (
        <>

            <NavBar />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <SideBar children={'Services'} />

                <Box sx={{
                    width: '80%',
                }}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                    }}>
                        <img src="photo2.jpg" alt="my image" width={'100%'} height={'700px'} />
                    </Box>

                    {/* <FlexBetween > */}
                    <Typography sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '32px',
                        fontStyle: 'italic',
                        fontFamily: 'Gotham, sans-serif',
                        padding: '20px',
                        paddingTop: '70px',
                        "&::after": {
                            content: '""',
                            position: 'absolute',
                            display: 'block',
                            width: '4.8rem',
                            height: '.1rem',
                            backgroundColor: 'black',
                            marginTop: '3.5rem',
                        }
                    }}>
                        Services
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '30px',
                    }}>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '3rem',
                            mb: '70px'
                        }}>
                            <Box sx={{
                                flexBasis: '30%',
                            }}>
                                <img src="photo1.jpg" alt="my image" width={'600xp'} height={'350px'} />
                            </Box>
                            <Box sx={{
                                flexBasis: '50%',
                                // padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                <Typography sx={{
                                    fontSize: '32px',
                                    fontFamily: 'inner',
                                    fontStyle: 'italic',
                                    color: '#909090'
                                }}>
                                    Diagnostic Services
                                </Typography>
                                <Typography sx={{
                                    padding: ''
                                }}>
                                    Our state-of-the-art facilities offer advanced diagnostic tools to assess heart health accurately. These include:
                                    <ul>
                                        <li>Electrocardiograms (ECGs): Recording the heart's electrical activity to detect abnormalities.
                                        </li>
                                        <li>Echocardiography: Using ultrasound to evaluate heart structure and function.</li>
                                        <li>Stress Tests: Assessing heart performance under exertion to diagnose coronary artery disease.</li>
                                        <li>Holter Monitors: Continuous monitoring of heart activity over 24-48 hours for detecting irregularities.</li>
                                    </ul>
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '3rem',
                            mb: '70px'
                        }}>
                            <Box sx={{
                                flexBasis: '50%',
                                // padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                <Typography sx={{
                                    fontSize: '32px',
                                    fontFamily: 'inner',
                                    fontStyle: 'italic',
                                    color: '#909090'
                                }}>
                                    Name
                                </Typography>
                                <Typography sx={{
                                    padding: ''
                                }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Typography>
                            </Box>
                            <Box sx={{
                                flexBasis: '30%',
                            }}>
                                <img src="photo3.jpg" alt="my image" width={'600xp'} height={'350px'} />
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',

                            gap: '3rem',
                            mb: '70px'
                        }}>
                            <Box sx={{
                                flexBasis: '30%',
                            }}>
                                <img src="photo1.jpg" alt="my image" width={'600xp'} height={'350px'} />
                            </Box>
                            <Box sx={{
                                flexBasis: '50%',
                                // padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                <Typography sx={{
                                    fontSize: '32px',
                                    fontFamily: 'inner',
                                    fontStyle: 'italic',
                                    color: '#909090'
                                }}>
                                    Name
                                </Typography>
                                <Typography sx={{
                                    padding: ''
                                }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Typography>
                            </Box>
                        </Box>


                    </Box>
                    {/* </FlexBetween> */}
                </Box>
            </Box>


            <Footer />
        </>
    )
}

export default Services
