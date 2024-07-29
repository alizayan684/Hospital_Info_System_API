import React, { useState, useEffect } from 'react';
import {Typography} from "@mui/material";
import CountUp from "react-countup";

const MostUsedDevice = () => {
    const [device, setDevice] = useState({
        name: "Catheter",
        timesUsed: 9833,
    });

    useEffect(() => {
        const fetchDeviceData = async () => {
            const response = await fetch('/api/devices/most-used'); // Replace with your actual API endpoint
            const data = await response.json();
            setDevice(data);
        };

        // fetchDeviceData();
    }, []);

    return (
        <>
            <Typography variant="h5">
                Most Used Device in the Department
            </Typography>
            <Typography variant="h6">
                {device.name} | <CountUp end={device.timesUsed} duration={4} /> times
            </Typography>
        </>
    );
};

export default MostUsedDevice;