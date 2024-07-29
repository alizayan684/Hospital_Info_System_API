import React from 'react'
import Form from '../loginPage/Form'
import { Box, Button, TextField, useTheme, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from 'react-redux'
import NavBar from '../Bars/NavBar';
import Footer from '../Bars/Footer';

const Edit = () => {

    const user = useSelector((state) => state.user)
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const oldUser = {
        firstName: 'ahmed',
        lastName: 'mahmoud',

    }

    return (
        <>

            <NavBar />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '100vh',
                    backgroundColor: 'lightgray',
                }} >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        alignItems:'flex-start',
                        marginTop:'50px',
                        backgroundColor: 'lightgray',
                    }}
                    >
                    <Box
                        sx={{
                            padding: '30px',
                            // border:'2px solid black',
                            borderRadius: '10px',
                            backgroundColor: 'white',
                        }}
                    >
                        <Form isEdit={true} oldUser={oldUser} />

                    </Box>

                </Box>
                    
            </Box>
            <Footer />
        </>


    )
}

export default Edit