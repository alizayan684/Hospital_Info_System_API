import express from "express"
import {
    getAppointmentByPatientId , deleteAppointmentByPatient_AppId, requestAppointmentByPatient
} from '../controllers/patient.js';

const patientRouter = express.Router();

patientRouter.get('/patient_appointments/:patient_id' , getAppointmentByPatientId);
patientRouter.delete('/patient_appointments/:app_id'  , deleteAppointmentByPatient_AppId);
//this route should appear when a submit button is clicked in the patient's appoinment request page
patientRouter.post('/app_requests/:patient_id'  , requestAppointmentByPatient);


export default patientRouter;