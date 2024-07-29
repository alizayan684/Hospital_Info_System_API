
import express from "express"
import {
    getShiftsByDoctorId, getAppointmentByDocId, postScansForEachApp, postLabResForEachApp, getSupervizedPatientsByDocId,
    requestShift, deleteShiftRequest
} from '../controllers/doctor.js';
import { userAuth } from '../middleware/auth.js';

const doctorRouter = express.Router();


doctorRouter.get('/shifts/:id'  , getShiftsByDoctorId);


doctorRouter.get('/appointments/:id'  , getAppointmentByDocId);

doctorRouter.post('/appointments/:id/:app_id/scans'  ,postScansForEachApp);

doctorRouter.post('/appointments/:id/:app_id/lab_tests'  ,postLabResForEachApp);


doctorRouter.get('/supervised_patients/:id'  ,getSupervizedPatientsByDocId );


doctorRouter.post('/shiftrequests/:id'  , requestShift);

doctorRouter.delete('/del_shiftrequest/:id'  , deleteShiftRequest);


export default doctorRouter;
