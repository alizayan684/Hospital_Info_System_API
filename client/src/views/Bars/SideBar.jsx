import { Box,Typography } from '@mui/material'
import React from 'react'

const SideBar = ({children}) => {
  return (
    <>
        <Box sx={{
                    width: '300px',
                    backgroundColor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        textAlign: 'left',
                        paddingTop:'30px',
                        color:'white',
                        display: 'grid',
                    }}>
                        <Typography sx={{
                            fontSize: '25px',
                            paddingBottom:'20px',
                            "&::after": {
                            content: '""',
                            position: 'absolute',
                            display: 'block',
                            width: '3.5rem',
                            height: '.1rem',
                            backgroundColor: 'white',
                            marginTop: '0.5rem',

                        }}}>
                        {children}
                    </Typography>
                    </Box>
                </Box>
    </>
  )
}

export default SideBar