import React, { useContext, useState, useEffect } from 'react';
import { UserAddedContext } from './UserAddedContext';
import {Typography} from "@mui/material";

const AdminsCount = () => {
    const rerender = useContext(UserAddedContext);
    const count = 13
    // const [count, setCount] = useState(0);
    //
    // useEffect(() => {
    //     const fetchAdminsCount = async () => {
    //         const response = await fetch('/api/admins/count'); // Replace with your actual API endpoint
    //         const data = await response.json();
    //         setCount(data.count);
    //     };
    //
    //     fetchAdminsCount();
    // }, [rerender]);

    return (
        <Typography variant="h5" padding={3}>
            Number of admins: {count}
        </Typography>
    );
};

export default AdminsCount;