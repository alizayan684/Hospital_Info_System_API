import express from 'express';
import { userAuth } from '../middleware/auth.js';
import { getContactData , saveContactData } from '../controllers/contact.js';
const contactRouter = express.Router();
contactRouter.post('/add_contact_form/:patient_id',saveContactData);
contactRouter.get('/view_contacts', getContactData);

export default contactRouter;
