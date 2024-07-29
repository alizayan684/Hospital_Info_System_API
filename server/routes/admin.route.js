import express from 'express';
import { userAuth } from '../middleware/auth.js';
import {
        getDashboard, getAllPatients, getPatByID, getAllEquipments,
        addEquipment, getEquByID, deleteEquByID, getAllDoctors, registerDoctor,
        getDocByID, updateDocByID, deleteDocByID, getAllAppointments, addAppointment,
        updateApmntByID, deleteApmntByID, acceptAppointmentReq, getAllShifts, addShift,registerAdmin, getAllShiftRequests
} from '../controllers/admin.js';


const adminRouter = express.Router();

adminRouter.get('/dashboard' ,getDashboard);

adminRouter.get('/pat' ,getAllPatients)
           .get('/pat/:id' ,getPatByID);


adminRouter.get('/equ' ,getAllEquipments)
           .post('/equ' ,addEquipment)
           .get('/equ/:id' ,getEquByID)
           .delete('/equ/:id',deleteEquByID);


adminRouter.get('/doc' ,getAllDoctors)
           .post('/doc' ,registerDoctor)
           .get('/doc/:id',getDocByID)
           .patch('/doc/:id',updateDocByID)
           .delete('/doc/:id' ,deleteDocByID);


adminRouter.get('/apmnt' ,getAllAppointments)
           .post('/apmnt' ,addAppointment)
           .patch('/apmnt/:id' ,updateApmntByID)
           .delete('/apmnt/:id' ,deleteApmntByID);
adminRouter.post('/accept_apmnt' ,acceptAppointmentReq)

adminRouter.get('/shifts',getAllShifts)
           .post('/shifts/:doc_id',addShift)

adminRouter.post('/add_admin', registerAdmin);
adminRouter.get('/shift_requests', getAllShiftRequests);
export default adminRouter;