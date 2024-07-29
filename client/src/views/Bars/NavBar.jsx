import { useState } from 'react'
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    Icon,
    List,
    ListItem,
    ListItemText,
    ListItemButton
} from '@mui/material'
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material"
import { setMode, setLogout } from '../../state/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../layouts/FlexBetween.jsx'

const NavBar = () => {

  const dispatch = useDispatch();                         // comment
  const navigate = useNavigate();                         // comment
  const user = useSelector((state) => state.user)         // comment

  const theme = useTheme()                                // comment
  const neutralLight = theme.palette.neutral.light        // comment
  const primaryLight = theme.palette.primary.light        // comment


  // const fullName = `${user.rows[0].fname} ${user.rows[0].lname}`
  const fullName = 'ahmed mahmoud'


  return (
    <FlexBetween
      padding={'2rem 6%'}
      // backgroundcolor={'#fff'}
      backgroundColor={'black'}
      sx={{
        boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.05)'

      }}
    >
      <FlexBetween gap="2rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem,3rem,3.25rem)"
          color="white"
          onClick={() => navigate("/")}
          sx={{
            cursor:'pointer'
          }}
          display={'flex'}
          alignSelf={'center'}
        >
          CMC
          <IconButton 
            onClick={() => navigate("/")}
            sx={{
              marginLeft:'10px',
            }}
          >
            <img  src="healthicons--heart-organ-negative.svg" alt="My Icon"/>
          </IconButton>

        </Typography>

      </FlexBetween>

      <FlexBetween>
        <FlexBetween className='Menu' >
          <List sx={{ display: 'flex', padding: 0 }}>
            <ListItem button onClick={() => navigate("/services")} sx={{ fontSize: '1.2rem', color: 'white', marginRight: '1rem', "&:hover": { color: primaryLight } }}>
              Services
              <ListItemText onClick={() => navigate("/home")} />
            </ListItem>
            <ListItem button onClick={() => navigate("/staff")} sx={{ fontSize: '1.2rem', color: 'white', marginRight: '1rem', "&:hover": { color: primaryLight } }}>
              Staff
              <ListItemText />
            </ListItem>
          </List>
        </FlexBetween>


        <FlexBetween gap="2rem">
          {/* <IconButton onClick={()=>dispatch(setMode())}>
                {theme.palette.mode ==="dark" ? (
                  <DarkMode sx={{fontSize:"25px"}} />
                ) : (
                  <LightMode sx={{fontSize:"25px"}}/>
                )}
                </IconButton> */}
          <FormControl variant="standard"
            value={fullName}
          >
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,      //neutralLight =  #E6FBFF
                width: "170px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,   //neutralLight =  #E6FBFF
                },
              }}
              input={<InputBase />}
            >
              <MenuItem
                value={fullName}
                onClick={() => navigate(`/profile`)}          //comment
              >
                <Typography>
                  {fullName}
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>        {/*comment*/}
            </Select>
          </FormControl>
        </FlexBetween>
      </FlexBetween>
    </FlexBetween>


  )
}

export default NavBar
