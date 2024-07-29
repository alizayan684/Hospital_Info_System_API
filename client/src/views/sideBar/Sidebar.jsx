import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { List, ListItem, ListItemIcon} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                backgroundColor: '#66E6FC',
                width: hover ? '250px' : '60px',
                height: 'calc(100vh - 64px)', 
                transition: 'width 0.3s',
                overflowX: 'hidden',
                position: 'fixed',
                borderRadius: '5px',
                top: '98px', 
                right: 0,
                '&:hover': {
                    width: '250px',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <List>
                <ListItem button sx={{ justifyContent: 'flex-end', padding: '10px 8px' }}>
                    <Box sx={{ display: hover ? 'block' : 'none', mr: '10px', transition: 'opacity 0.3s', opacity: hover ? 1 : 0 }}>
                        <Typography sx={{ fontSize: '20px' }}>
                            Dashboard
                        </Typography>
                    </Box>
                    <ListItemIcon sx={{ minWidth: '40px', justifyContent: 'center' }}>
                        <img src="/bxs--dashboard.svg" alt="Dashboard Icon" style={{ display: 'block' }} />
                    </ListItemIcon>
                </ListItem>

                <ListItem button sx={{ justifyContent: 'flex-end', padding: '10px 8px' }}
                    onClick={() => navigate('/profile')}
                >
                    <Box sx={{ display: hover ? 'block' : 'none', mr: '10px', transition: 'opacity 0.3s', opacity: hover ? 1 : 0 }}>
                        <Typography sx={{ fontSize: '20px' }}>
                            Profile
                        </Typography>
                    </Box>
                    <ListItemIcon sx={{ minWidth: '40px', justifyContent: 'center' }}>
                        <img src="/person.svg" alt="Profile Icon" style={{ display: 'block' }} />
                    </ListItemIcon>
                </ListItem>
            </List>

            <List>
                <ListItem button sx={{ justifyContent: 'flex-end',padding: '10px 8px', mb:'30px'}}
                >
                    <Box sx={{ display: hover ? 'block' : 'none', mr: '10px', transition: 'opacity 0.3s', opacity: hover ? 1 : 0 }}>
                        <Typography sx={{ fontSize: '20px' }}>
                            Settings
                        </Typography>
                    </Box>
                    <ListItemIcon sx={{ minWidth: '40px', justifyContent: 'center' }}>
                        <img src="/mdi--settings.svg" alt="Settings Icon" style={{ display: 'block' }} />
                    </ListItemIcon>
                </ListItem>
            </List>
        </Box>
    );
}

export default Sidebar;
