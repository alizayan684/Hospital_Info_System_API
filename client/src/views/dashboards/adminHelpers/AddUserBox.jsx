import React, {useContext, useState} from 'react';
import { Button, Box } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { ReactComponent as Stethoscope } from "../../../assets/Stethoscope.svg";
import AddUserDialog from './AddUserDialog';
import { UserAddedContext } from './UserAddedContext';

const AddUserBox = () => {
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const handleUserAdded = useContext(UserAddedContext);

    const handleOpen = (role) => {
        setRole(role);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleUserAdded();
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
            <Button
                fullWidth
                variant="contained"
                startIcon={<AdminPanelSettings />}
                onClick={() => handleOpen('admin')}
                sx={{ backgroundColor: '#E4E6C3' }}
            >
                Add Admin
            </Button>
            <Button
                fullWidth
                variant="contained"
                startIcon={<Stethoscope style={{ height: '24px', width: '24px' }} />}
                onClick={() => handleOpen('doctor')}
                sx={{ backgroundColor: '#E4E6C3' }}
            >
                Add Doctor
            </Button>
            <AddUserDialog open={open} handleClose={handleClose} role={role} />
        </Box>
    );
};

export default AddUserBox;