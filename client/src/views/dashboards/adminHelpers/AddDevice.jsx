import React, { useState } from 'react';
import {Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, InputAdornment} from '@mui/material';
import {ReactComponent as DeviceSVG} from "../../../assets/Device.svg"

const AddDevice = () => {
    const [open, setOpen] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const [deviceDescription, setDeviceDescription] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Add code here to save the new device
        console.log(deviceName);
        handleClose();
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ backgroundColor: '#E4E6C3' }} startIcon={<DeviceSVG style={{ height: '24px', width: '24px' }} />} >
                Add Device
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Device Name"
                        type="text"
                        fullWidth
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={deviceDescription}
                        onChange={(e) => setDeviceDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddDevice;