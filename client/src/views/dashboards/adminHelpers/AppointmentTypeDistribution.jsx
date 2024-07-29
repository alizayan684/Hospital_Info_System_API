import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {Box, Typography} from "@mui/material";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AppointmentTypeDistribution = () => {
    const [data, setData] = useState([
        {
            name: 'General Checkup',
            value: 400,
        },
        {
            name: 'Consultation',
            value: 300,
        },
        {
            name: 'Dental',
            value: 300,
        },
        {
            name: 'Eye Checkup',
            value: 200,
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/appointments/distribution'); // Replace with your actual API endpoint
            const data = await response.json();
            setData(data.map(item => ({ name: item.type, value: item.count })));
        };

        // fetchData();
    }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" align="center" gutterBottom>
                Appointment Type Distribution
            </Typography>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </Box>
    );
};

export default AppointmentTypeDistribution;