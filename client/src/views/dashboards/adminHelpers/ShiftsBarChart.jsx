import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Box, Typography} from "@mui/material";

const ShiftsBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch('/api/shifts/count'); // Replace with your actual API endpoint
            // const counts = await response.json();
            const _counts = [38, 56, 49, 12, 68, 45, 63];
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            const data = days.map((day, index) => ({
                day,
                doctors: _counts[index]
            }));

            setData(data);
        };

        fetchData();
    }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" align="Center" gutterBottom>
                Doctors' Shifts' Distribution
            </Typography>
            <BarChart
                width={650}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="doctors" fill="#8884d8" />
            </BarChart>
        </Box>
    );
};

export default ShiftsBarChart;