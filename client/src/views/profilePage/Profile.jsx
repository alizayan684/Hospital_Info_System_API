import React from 'react'
import NavBar from '../Bars/NavBar.jsx'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from '../../Widgets/UserWidget'
import { useTheme } from '@emotion/react'
import ProfileInfoWidget from '../../Widgets/profileInfoWidget.jsx'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../sideBar/Sidebar.jsx'
import Footer from '../Bars/Footer.jsx'


const Profile = () => {

   const [user, setUser] = useState(null);
   const users = useSelector(state => state.user)

   const userId = users.rows[0].id
   const picturePath = users.rows[0].picturepath
   const token = useSelector((state) => state.token);
   const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
   const theme = useTheme()

   const getUser = async () => {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
         method: "GET",
         headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
   };
   useEffect(() => {
      getUser();
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   if (!user) return null;

   return (
      <Box>
         <NavBar />
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
            }}
         >

            <Box sx={{
               width: '300px',
               backgroundColor: 'black',
               display: 'flex',
               alignItems: 'center',
               flexDirection: 'column',
            }}>
               <Box sx={{
                  textAlign: 'left',
                  paddingTop: '30px',
                  color: 'white'
               }}>
                  <Typography sx={{
                     fontSize: '20px',
                     paddingBottom: '20px',
                     "&::after": {
                        content: '""',
                        position: 'absolute',
                        display: 'block',
                        width: '2.5rem',
                        height: '.1rem',
                        backgroundColor: 'white',
                        marginTop: '0.5rem',

                     }
                  }}>
                     Profile
                  </Typography>
               </Box>
            </Box>
            <Box
               sx={{
                  width: '86%',
                  display: 'flex',
                  justifyContent: 'center',
               }}
            >
               <Box
                  sx={{
                     backgroundColor: "black",
                     color: 'white',
                     width: '1100px',
                     height: '750px',
                     marginTop: '70px',
                     marginBottom: '100px',
                     display: 'flex',
                     justifyContent: 'space-between',
                     

                  }}
               >
                  <Box
                     sx={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        gridTemplateColumns: '5fr 10fr', // 3/12 and 9/12 column distribution
                        // gap: '16px', // optional, adjust the gap between columns
                     }}
                  >
                     <UserWidget userId={userId} PicturePath={picturePath} />
                     <ProfileInfoWidget userId={userId} />
                  </Box>
               </Box>
            </Box>

         </Box>
         <Footer />
      </Box>
   )
}

export default Profile