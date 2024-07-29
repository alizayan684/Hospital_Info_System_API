import dataBase from '../utilities/connection_data.js'
// get all patient's appointments showing scans and lab results accompanied by each appointment
export const getAppointmentByPatientId = async(req , res)=>{
    const {pat_id} = req.params;

    try {
      const result = await dataBase.query(`SELECT u.user_fname , u.user_lname, a.day_date, a.start_time, a.end_time, a.drug,
         l.test_name, l.comments, l.test_img, l.test_price,
         s.scan_name, s.comments, s.scan_img, s.scan_price
         FROM appointments a 
         JOIN scans s ON a.app_id = s.app_id_reference
         JOIN lab_results l ON a.app_id = l.app_id_reference 
         JOIN users u ON a.doctor_id = u.user_id
         WHERE a.patient_id = $1` , [pat_id] );
         
      if(result.rows.length === 0){
        return res.status(404).json({msg : 'No appointments are found'});
      }
      // show patient appoinments
      return res.status(200).json(result.rows);
    } catch(error){
      console.error('Error fetching patient appointments:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }



  // deleting an appointment by its id after selecting it from all the patient's appointments (after getting all appointments by patient's id by the controller upwards)
export const deleteAppointmentByPatient_AppId = async(req, res)=>{
    try{
        const app_id = req.params.app_id;
        // delete lab results and scans related to the appointment
        const deleteLabResults = await dataBase.query('DELETE FROM lab_results WHERE app_id_reference = $1 RETURNING * ' , [app_id]);
        const deleteScans = await dataBase.query('DELETE FROM scans WHERE app_id_reference = $1 RETURNING * ' , [app_id]);
        const deleteApp = await dataBase.query('DELETE FROM appointments WHERE app_id = $1 RETURNING * ' , [app_id]);
        const deletedApp = deleteApp.rows[0];

        //logging the id fo the deleted appointment in the console  
        console.log({
            deleted_app_id : deletedApp.app_id
        });

        res.status(200).send(`appointment ${app_id} deleted successfully`);
    }
    catch(error){
        console.error('Error deleting patient appointments:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Request an appointment by a patient
export const requestAppointmentByPatient = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const {patient_fname, patient_lname, doctor_fname, doctor_lname } = req.body;
    // Use parameterized query to prevent SQL injection
    const doctorIDResult = await dataBase.query(
      `SELECT user_id FROM users WHERE user_fname = $1 AND user_lname = $2 `, [doctor_fname, doctor_lname]
    );
    if (doctorIDResult.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const doctorID = doctorIDResult.rows[0].user_id;
    const newAppointmentRequest = await dataBase.query(
      `INSERT INTO app_requests(patient_id, patient_fname, patient_lname, doctor_fname, doctor_id, request_date, doctor_lname) VALUES($1, $2, $3, $4, $5, NOW(), $6) RETURNING *`,
      [patient_id, patient_fname, patient_lname, doctor_fname, doctorID, doctor_lname]
    );
    res.status(200).json(newAppointmentRequest.rows[0]);
  } catch (error) {
    console.error("Couldn't make a new appointment request", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all appointment available by a patient
export const getAvailableAppointments = async (req, res) => {
  try {
    const { doctor_fname, doctor_lname, dayRequired,patient_start_time,patient_end_time } = req.body;
    const docID = await dataBase.query(`select user_id from users where user_fname = $1 AND user_lname = $2`, [doctor_fname, doctor_lname]);
    res.status(200).json(docID);
  } catch (error) {
    res.status(500).json({ message: "Doctor name not found" });
  }

  // finally{ console.log("Will look for dcotor shifts")
  //   try {
  //     const docAvailableTime = await dataBase.query(`select start_time,end_time from shifts where doctor_id = $1 and day = $2`, [docID,dayRequired]);
  //     res.status(200).json(docAvailableTime.rows);
  //   } catch (error) {
  //     res.status(500).json({ message: "Doctor is not available at this day" });
  //   }finally{
  //     try {
  //     const reservedSlots = await dataBase.query(`select start_time, end_time from appointments where doctor_id = $1 and day_date = $2`, [docID, dayRequired]);
  //     res.status(200).json(reservedSlots.rows);
  //     }
  //     catch (error) {
  //       res.status(500).json({ message: "Doctor is not available at this day" });
  //     }finally{
  //       const availableSlots = [];
  //       for (let index = 0; index < reser.length; index++) {
  //         const element = array[index];
          
  //       }
  //     }
  //   }
  // };
};