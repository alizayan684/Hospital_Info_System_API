import express from "express";
import authRouter from "./auth.route.js";
import ActivitiesRouter from "./activities.route.js";
import userRouter from "./user.route.js";
import adminRouter from "./admin.route.js";
import doctorRouter from "./doctor.route.js";
import patientRouter from "./patient.route.js";
import homeRouter from "./home.route.js";
import contactRouter from "./contact.route.js";

const apiRoutes=express.Router();

apiRoutes.use('/auth',authRouter);
apiRoutes.use('/activities',ActivitiesRouter);
apiRoutes.use('/users',userRouter)
apiRoutes.use('/admin',adminRouter)
apiRoutes.use('/doctor',doctorRouter)
apiRoutes.use('/patient',patientRouter)
apiRoutes.use('/home',homeRouter)
apiRoutes.use('/contact',contactRouter)



export default apiRoutes;