import React, { useContext, useState, useEffect } from 'react';
import { UserAddedContext } from './UserAddedContext';
import {Typography} from "@mui/material";

const DoctorsCount = () => {
    const rerender = useContext(UserAddedContext);
    const [count, setCount] = useState(79);
    //
    // useEffect(() => {
    //     const fetchDoctorsCount = async () => {
    //         const response = await fetch('/api/doctors/count'); // Replace with your actual API endpoint
    //         const data = await response.json();
    //         setCount(data.count);
    //     };
    //
    //     fetchDoctorsCount();
    // }, [rerender]);

    return (
        <Typography variant="h5" padding={3}>
            Number of doctors: {count}
        </Typography>
    );
};

export default DoctorsCount;