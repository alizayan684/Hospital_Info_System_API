import { Box, Typography, Grid, Divider, ListItem, IconButton } from '@mui/material'
import React from 'react'
import FlexBetween from '../../layouts/FlexBetween'
import { useNavigate } from 'react-router-dom'
import { List } from '@mui/icons-material'

const Footer = () => {

    const navigate=useNavigate()

    return (
        <>
            <Box
                width="100%"
                padding={'3% 3%'} 
                display={"flex"}
                gap="2rem"
                bgcolor={'black'}
                color={'white'}
            >
                <Box flexBasis={"72%"}>
                    <Grid container spacing={2} ml={'15%'}>
                        {/*<Grid item xs={3}>*/}
                        {/*    <Typography sx={{ p: '2', mb: 2, textAlign: 'left', fontWeight: 'bold',cursor:'pointer'  }} onClick={()=>navigate('/')}>*/}
                        {/*        ABOUT CMC*/}
                        {/*    </Typography>*/}
                        {/*    <Typography sx={{ p: '2 0', textAlign: 'left', color: '#8d8a8e' }}>*/}
                        {/*        Messions*/}
                        {/*    </Typography>*/}
                        {/*    <Typography sx={{ p: '2 0', textAlign: 'left', color: '#8d8a8e' }}>*/}
                        {/*        Goals*/}
                        {/*    </Typography>*/}
                        {/*</Grid>*/}

                        <Grid item xs={3}>
                            <Typography sx={{ p: '2', mb: 2, textAlign: 'left', fontWeight: 'bold' ,cursor:'pointer' }} onClick={()=>navigate('/services')}>
                                Services
                            </Typography>
                            <Typography sx={{ p: '2 0', textAlign: 'left', color: '#8d8a8e' }}>
                                Equipments
                            </Typography>
                            <Typography sx={{ p: '2 0', textAlign: 'left', color: '#8d8a8e' }}>
                                Operations
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography sx={{ p: '2', mb: 2, textAlign: 'left', fontWeight: 'bold',cursor:'pointer'  }} onClick={()=>navigate('/staff')}>
                                Staff
                            </Typography>
                            <Typography sx={{ p: '2 0', textAlign: 'left', color: '#8d8a8e' }}>
                                Leaderships
                            </Typography>
                            <Typography sx={{ p: '2 0', textAlign: 'left', color: '#8d8a8e' }}>
                                Members
                            </Typography>
                        </Grid>

                    </Grid>
                </Box>

                <Box
                    sx={{
                        borderLeft: '1px solid #8d8a8e',
                        mr:'10px'
                    }}
                >

                </Box>


                <Box flexBasis={"20%"}
                    sx={{
                        color: "white",
                        flexDirection: "column",
                        padding: ' 10px ',
                    }}
                >

                    <Typography mb={'10px'}>Cario Medical Center</Typography>
                    <Typography mb={'10px'}>6550 Bertner Avenue, Executive Offices</Typography>
                    <Typography mb={'10px'}>Cairo, Ca 77030</Typography>
                    <ListItem button 
                        sx={{
                            padding:'0  0 8px 0'
                        }}
                    >
                        <IconButton >
                            <img src="uil--facebook.svg"  alt="fackbook" />
                        </IconButton>
                        <IconButton>
                            <img src="pajamas--twitter.svg" alt="twitter" />
                        </IconButton>
                        <IconButton>
                            <img src="bi--linkedin.svg" alt="linkedin" />
                        </IconButton>
                    </ListItem>
                    <Typography mb={'10px'}>+20 (123)-456-7890 | info@cmc.edu</Typography>
                </Box>
        </Box >

            <Typography
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    backgroundColor: 'gray'
                }}
            >
                Copy Rights &copy; team-1-SBME-2026
            </Typography>
        </>
    )
}

export default Footer
