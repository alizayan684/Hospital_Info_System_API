import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Select,
    MenuItem,
    InputLabel,
    Typography, InputAdornment
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Grid from "@mui/material/Unstable_Grid2";

const addUserSchema = yup.object().shape({
    user_fname: yup.string().required("Required"),
    user_lname: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
    position: yup.string().required("Required"),
    role: yup.string().required("Required"),
    salary: yup.number().required("Required"),
    address: yup.string().required("Required"),
});

const doctorPositions = ["Resident", "Chief Resident", "Attending", "Fellow", "Department Head", "Medical Director"];
const adminPositions = ["Admin", "Super Admin"];

const AddUserDialog = ({ open, handleClose, role }) => {
    const initialValues = {
        user_fname: "",
        user_lname: "",
        email: "",
        password:  role === 'doctor' ? "newDoctor123" : "newAdmin123",
        role: role,
        position: role === 'doctor' ? "Resident" : "Admin",
        salary: "",
        address: "",
    }

    const handleSave = async (values, onSubmitProps) => {
        const input = role === 'doctor' ? `http://localhost:3001/api/admin/doc` : `http://localhost:3001/api/admin/add_admin`
        console.log(values)
        // handle form submission here
        const response = await fetch(input, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        onSubmitProps.resetForm();
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ backgroundColor: "#80DED9", color:"#000"}}>
                <Typography variant="h4">
                    Add {role}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={addUserSchema}
                    onSubmit={handleSave}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={4} margin={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.user_fname}
                                        name="user_fname"
                                        error={Boolean(touched.user_fname) && Boolean(errors.user_fname)}
                                        helperText={touched.user_fname && errors.user_fname}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.user_lname}
                                        name="user_lname"
                                        error={Boolean(touched.user_lname) && Boolean(errors.user_lname)}
                                        helperText={touched.user_lname && errors.user_lname}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address}
                                        name="address"
                                        error={Boolean(touched.address) && Boolean(errors.address)}
                                        helperText={touched.address && errors.address}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Password"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Role"
                                        value={role}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        value={values.position}
                                        onChange={handleChange}
                                        name="position"
                                        fullWidth
                                    >
                                        {role === 'doctor' ? doctorPositions.map((position, index) => (
                                            <MenuItem key={index} value={position}>{
                                                position}
                                            </MenuItem>
                                        )) : adminPositions.map((position, index) => (
                                            <MenuItem key={index} value={position}>
                                                {position}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Salary"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.salary}
                                        name="salary"
                                        error={Boolean(touched.salary) && Boolean(errors.salary)}
                                        helperText={touched.salary && errors.salary}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DialogActions>
                                        <Button onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="contained" color="primary" type="submit">
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default AddUserDialog;