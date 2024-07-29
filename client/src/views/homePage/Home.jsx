import React, { useState, useEffect } from 'react';
import NavBar from '../Bars/NavBar.jsx';
import { Box, Paper, Typography, Fade, Slide } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../Bars/Footer.jsx';
import heartBackground from '../../assets/heartBackground.jpg'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
// }

const Home = () => {
    const { ref, inView } = useInView({ threshold: 0.5 });
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (inView) {
            setShow(true);
        }
    }, [inView]);

    return (
        <>
            <NavBar />
            <Grid container spacing={0}>
                <Grid xs={12}>
                    <Fade in={true} timeout={1500}>
                        <Paper
                            elevation={3}
                            sx={{
                                backgroundImage: `url(${heartBackground})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '80vh',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                position: 'relative'
                            }}>
                            <Box sx={{ position: 'absolute', bottom: 120, left: 80, padding: 2}}>
                                <Slide direction="right" in={true} timeout={1500}>
                                    <Box>
                                        <Typography variant="h1">
                                            Welcome to CMC
                                        </Typography>
                                        <Typography variant="h3">
                                            Cairo's Pioneering Cardiovascular Department
                                        </Typography>
                                    </Box>
                                </Slide>
                            </Box>
                        </Paper>
                    </Fade>
                </Grid>
                <Grid xs={12} spacing={4}>
                    <Paper elevation={23} ref={ref} sx={{
                        backgroundColor: '#80DED9',
                        color: '#000',
                        display: 'flex',
                        position: 'relative',
                        padding: 0
                    }}>
                        <Grid container spacing={8} padding={4} sx={{ width: '100%', textAlign: 'center'}}>
                            <Grid xs={12} md={4}>
                                <Box sx={{
                                    height: '100%',
                                    left: 80
                                }}>
                                    <Slide direction="right" in={show} timeout={1500}>
                                        <Grid container rowSpacing={4}>
                                            <Grid item xs={12}>
                                                <Typography variant="h2">
                                                    About Us
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <img src="./cardiology.jpg" width={500} alt="" />
                                            </Grid>
                                        </Grid>
                                    </Slide>
                                </Box>
                            </Grid>
                            <Grid xs={12} md={8} textAlign="left">
                                <Slide direction="left" in={show} timeout={1500}>
                                    <Grid container rowSpacing={4} alignItems="center" height="100%">
                                        <Grid item xs={12}>
                                            <Typography variant="h3">
                                                Our Mission
                                            </Typography>
                                            <Typography variant="body1">
                                                Our mission is to be a beacon of excellence in cardiovascular care.
                                                We are dedicated to providing the most advanced preventive, diagnostic, and treatment options for heart and vascular diseases.
                                                Through compassionate and personalized care, we strive to improve the health and well-being of every patient entrusted to us.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">
                                                Our Vision
                                            </Typography>
                                            <Typography variant="body1">
                                                We envision a future free from cardiovascular disease.
                                                We aim to achieve this through continuous innovation in research and technology,
                                                fostering a community of well-informed individuals, and setting the standard for preventative care.
                                                By empowering patients to take charge of their heart health, we aspire to create a healthier generation.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">
                                                Our Values
                                            </Typography>
                                            <Typography variant="body1">
                                                Excellence: We are driven by a relentless pursuit of the highest quality care, staying at the forefront of cardiovascular medicine.
                                            </Typography>
                                            <Typography variant="body1">
                                                Compassion: We treat each patient with dignity and respect, understanding the emotional and physical challenges of heart disease.
                                            </Typography>
                                            <Typography variant="body1">
                                                Innovation: We embrace new technologies and advancements, translating them into improved patient outcomes.
                                            </Typography>
                                            <Typography variant="body1">
                                                Collaboration: We foster teamwork within our department and across specialties, ensuring a comprehensive and patient-centered approach.
                                            </Typography>
                                            <Typography variant="body1">
                                                Education: We empower patients with knowledge and resources to make informed decisions about their heart health.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Slide>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Paper elevation={23} sx={{backgroundColor: "#E4E6C3", color: "#000", padding: 4, textAlign: 'center' }}>
                        <Grid container columns={24} spacing={4}>
                            <Grid xs={8} md={4}>
                                <Typography>
                                    <CountUp end={12} duration={6} /> <br />
                                    Years of Excellence
                                </Typography>
                            </Grid>
                            <Grid xs={8} md={4}>
                                <Typography>
                                    <CountUp end={98} duration={7} />K <br />
                                    Patients Treated
                                </Typography>
                            </Grid>
                            <Grid xs={8} md={4}>
                                <Typography>
                                    <CountUp end={100} duration={5} />% <br />
                                    Patient Satisfaction
                                </Typography>
                            </Grid>
                            <Grid xs={8} md={4}>
                                <Typography>
                                    <CountUp end={100} duration={5} />% <br />
                                    Success Rate
                                </Typography>
                            </Grid>
                            <Grid xs={8} md={4}>
                                <Typography>
                                    <CountUp end={100} duration={3} />% <br />
                                    Survival Rate
                                </Typography>
                            </Grid>
                            <Grid xs={8} md={4}>
                                <Typography>
                                    <CountUp end={100} duration={2} />% <br />
                                    Recovery Rate
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
}

export default Home;
