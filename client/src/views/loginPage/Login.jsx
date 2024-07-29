import React from 'react'
import {
    useTheme,
    Box,
    Typography,
    useMediaQuery
} from "@mui/material";
import Form from "./Form";
import NavBar from '../Bars/NavBar';
import Footer from '../Bars/Footer';

const Login = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const lightBackgournd= theme.palette.background.default
    const neutralLight = theme.palette.neutral.light 

    return (
        <Box sx={{
            backgroundColor:'lightgray',
            height: '100%',

        }}>
            <NavBar/>

            
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor:'lightgray',
                }} >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        alignItems:'flex-start',
                        marginTop:'50px',
                        // backgroundColor:'lightgray'
                    }}
                    >
                    <Box
                        sx={{
                            padding: '30px',
                            borderRadius: '10px',
                            width: '700px',
                            backgroundColor:'white'
                            
                        }}
                    >
                        <Form  />
                    </Box>
                </Box>
                    
            </Box>
        </Box>
    )
}

export default Login
