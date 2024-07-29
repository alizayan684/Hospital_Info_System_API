import React, { useState } from 'react'
import { Box, Button, TextField, useTheme, Typography, useMediaQuery } from "@mui/material";
import { Formik } from "formik"
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../../layouts/FlexBetween";
import { EditOutlined } from "@mui/icons-material";
import { setLogin } from "../../state";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"

// TODO
// Add social media links in register
// Add phone number in register


const registerSchema = yup.object().shape({
	user_fname: yup.string().required("Required"),
	user_lname: yup.string().required("Required"),
	phone_number: yup.array(),
	sex: yup.string(),
	chronic_diseases: yup.array(),
	age: yup.string(),
	is_smoker: yup.boolean(),
	email: yup.string().email("Invalid email address").required("Required"),
	password: yup.string().required("Required"),
	// picture: yup.string(),
})

const editSchema = yup.object().shape({
	user_fname: yup.string(),
	user_lname: yup.string(),
	email: yup.string(),
	age: yup.string(),
	sex: yup.string(),
	phone_number: yup.string(),
	oldPassword: yup.string(),
	newPassword: yup.string(),
	picture: yup.string(),
})

const loginSchema = yup.object().shape({
	email: yup.string().email("Invalid email address").required("Required"),

	password: yup.string().required("Required"),
})

const initialValuesRegister = {
	is_smoker: "",
	chronic_diseases: "",
	email: "",
	password: "",
	user_fname: "",
	user_lname: "",
	age: "",
	sex: "",
	phone_number: ""
}

const initialValuesLogin = {
	email: "",
	password: "",

}

const initialValuesEdit = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	address: "",
	oldPassword: "",
	newPassword: "",
	picture: "",
}


const Form = ({ isEdit, oldUser }) => {
	let [pageType, setPageType] = useState("login");
	const { palette } = useTheme();

	let usr = useSelector((state) => state.user)
	if (isEdit && usr) {
		initialValuesEdit.firstName = usr.rows[0].fname
		initialValuesEdit.lastName = usr.rows[0].lname
		initialValuesEdit.email = usr.rows[0].email
		initialValuesEdit.phone = usr.rows[0].phone
		initialValuesEdit.address = usr.rows[0].address
		initialValuesEdit.picture = usr.rows[0].picture
	}

	const isNonMobile = useMediaQuery("(min-width: 600px)");
	let isLogin = pageType === "login";
	let isRegister = pageType === "register";
	let [sex,setSex]=useState('')

	const dispatch = useDispatch();
	const navigate = useNavigate();

	let schema;
	let initialValues;

	if (isLogin) {
		schema = loginSchema;
		initialValues = initialValuesLogin;
	}

	if (isRegister) {
		schema = registerSchema;
		initialValues = initialValuesRegister;
	}

	if (isEdit) {
		schema = editSchema;
		initialValues = initialValuesEdit;
	}

	const register = async (values, onSubmitProps) => {
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		formData.append("sex", sex);

		const savedUserResponse = await fetch(
			"http://localhost:3000/api/auth/register",
			{
				method: "POST",
				body: formData,
			}
		)
		const savedUser = await savedUserResponse.json();
		onSubmitProps.resetForm();

		if (savedUser) {
			setPageType("login")
		}
	}

	const login = async (values, onSubmitProps) => {
		console.log(values)
		const loggedInResponse = await fetch(
			"http://localhost:3001/api/auth/login",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}
		);
		const loggedIn = await loggedInResponse.json();
		const error = loggedIn.error
		// add ui elements
		if (error === "Invalid password") {
			return
		}
		if (error === "User not found") {
			return
		}

		onSubmitProps.resetForm();
		console.log(loggedIn)
		if (!loggedIn.error) {
			dispatch(
				setLogin({
					user: loggedIn.user,
					token: loggedIn.token,
				})
			)
		}
		navigate(`/dashboard`)
	}

	const handleFormSubmit = async (values, onSubmitProps) => {
		console.log("here")
		if (isEdit) await edit(values, onSubmitProps)
		else {
			if (isLogin) await login(values, onSubmitProps);
			if (isRegister && !isEdit) await register(values, onSubmitProps)
		}
	}

	const handelEditCancel = async () => {
		navigate(`/profile`);
	}

	const edit = async (values, onSubmitProps) => {
		if (!isEdit) { return }
		console.log(JSON.stringify(values));


		const valuesForm = {
			"firstName": values.firstName,
			"lastName": values.lastName,
			"email": values.email,
			"phone": values.phone,
			"address": values.address,
			"oldPassword": values.oldPassword,
			"newPassword": values.newPassword,
			"picturePath": values.picture ? values.picture.path : usr.picturePath
		}
		// console.log(oldUser.rows[0].picture);

		const editResponse = await fetch(
			`http://localhost:3001/api/users/edit/${usr.rows[0].id}`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(valuesForm),
			}
		);

		try {
			const edited = await editResponse.json();
			onSubmitProps.resetForm();
			if (!edited.error) {
				dispatch(setLogin({ user: edited.user, token: edited.token }));
			} else {
				// Handle server-side edit error (e.g., display an error message)
				console.error("Error updating user:", edited.error);
			}
			navigate(`/profile`);
		} catch (err) {
			console.error("Error editing user:", err);
			// Handle potential network errors
		}
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValues}
			validationSchema={schema}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldValue,
				resetForm,
			}) => (
				<form
					onSubmit={handleSubmit}
				>
					<Box
						display="grid"
						gap="30px"
						gridTemplateColumns="repeat(6, minmax(0, 2fr))"
						sx={{
							"& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
						}}
					>
						{(isRegister || isEdit) && (
							<>
								<TextField
									label="user_fname"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="user_fname"
									error={Boolean(touched.firstName) && Boolean(errors.firstName)}
									helperText={touched.firstName && errors.firstName}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									label="user_lname"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									name="user_lname"
									error={Boolean(touched.lastName) && Boolean(errors.lastName)}
									helperText={touched.lastName && errors.lastName}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									label="phone_number"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.phone}
									name="phone_number"
									error={Boolean(touched.phone) && Boolean(errors.phone)}
									helperText={touched.phone && errors.phone}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									label="age"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.adress}
									name="age"
									error={Boolean(touched.address) && Boolean(errors.address)}
									helperText={touched.address && errors.address}
									sx={{ gridColumn: "span 6" }}
								/>
							</>
						)}
						<TextField
							label="Email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name="email"
							error={Boolean(touched.email) && Boolean(errors.email)}
							helperText={touched.email && errors.email}
							sx={{

								gridColumn: "span 6"
							}}
						/>


						{isEdit ? (
							<>
								<TextField
									label="Old Password"
									type="password"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.oldPassword}
									name="oldPassword"
									error={Boolean(touched.oldPassword) && Boolean(errors.oldPassword)}
									helperText={touched.oldPassword && errors.oldPassword}
									sx={{
										gridColumn: "span 3",


									}}
								/>
								<TextField
									label="New Password"
									type="password"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.newPassword ? values.newPassword : null}
									name="newPassword"
									error={Boolean(touched.newPassword) && Boolean(errors.newPassword)}
									helperText={touched.newPassword && errors.newPassword}
									sx={{ gridColumn: "span 3" }}
								/>
							</>

						) : (<TextField
							label="Password"
							type="password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name="password"
							error={Boolean(touched.password) && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							sx={{ gridColumn: "span 6" }}
						/>
						)
						}

<Box sx={{
							display: 'flex',
							justifyContent: 'space-around',
							gridColumn: "span 6"
						}}>
							<Button
								sx={{
									border: '1px solid #C1C1C1',
									borderRadius: '15px',
									height: '50px',
									width: '48%',
								}}
								onClick={()=>setSex('male')}
								
								>
								Male
							</Button>
							<Button
								sx={{
									border: '1px solid #C1C1C1',
									borderRadius: '15px',
									height: '50px',
									width: '48%',
								}}
								onClick={()=>setSex('female')}
								
							>
								Female
							</Button>
							

						</Box>

						{(isRegister || isEdit) && (
							<>
								<Box

									gridColumn="span 6"
									border={`1px solid ${palette.neutral.medium}`}
									borderRadius="5px"
									p="1rem"
								>
									<Dropzone
										acceptedFiles=".jpg, .png, .jpeg"
										multiple={false}
										onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
										value={values.picture}
									>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()}
												border={`2px dashed #CC1A26`}
												p={"1rem"}
												sx={{ "&:hover": { cursor: "pointer" } }}
											>
												<input {...getInputProps()} />
												{!values.picture ? (
													<p> Add Picture Here</p>
												) : (<FlexBetween>
													<Typography>
														{values.picture.name}
													</Typography>
													<EditOutlinedIcon />
												</FlexBetween>)}
											</Box>
										)}
									</Dropzone>
								</Box>
							</>
						)}


						
					</Box>



					<Box>
						{isEdit ? (
							<>
								<Button
									fullwidth
									type="submit"
									sx={{
										m: "2rem 0",
										mr: "1rem",
										p: "1rem",
										backgroundColor: '#CC1A26',
										color: palette.background.alt,
										"&:hover": {
											color: palette.background.alt,
											backgroundColor: '#A01720',
										},
									}}
								>
									{"Edit"}
								</Button>
								<Button
									fullwidth
									onClick={() => handelEditCancel()}
									sx={{
										m: "2rem 0",
										p: "1rem",
										backgroundColor: '#CC1A26',
										color: palette.background.alt,
										"&:hover": {
											color: palette.background.alt,
											backgroundColor: '#A01720',
										},
									}}
								>
									{"Cancel"}
								</Button>
							</>
						) : (

							<>
								<Button
									fullwidth
									type="submit"
									sx={{
										m: "2rem 0",
										p: "1rem",
										backgroundColor: '#CC1A26',
										color: palette.background.alt,
										// color: palette.background.alt,
										"&:hover": {
											backgroundColor: '#A01720',
										},
									}}
								>
									{isLogin ? "LOGIN" : "REGISTER"}
								</Button>
								<Typography
									onClick={() => {
										setPageType(isLogin ? "register" : "login")
										resetForm()
									}}
									sx={{
										textDecoration: "underline",
										color: '#CC1A26',
										"&:hover": {
											cursor: "pointer",
										},
									}}
								>
									{isLogin
										? "Dont have an account? Sign up here."
										: "Already have an account? Login here."}
								</Typography>
							</>
						)
						}
					</Box>
				</form>
			)}
		</Formik>
	)
}

export default Form
